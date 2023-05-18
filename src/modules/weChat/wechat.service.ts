import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateQuery } from "mongoose";
import { Message } from "wechaty";
import { create } from "xmlbuilder2";
import { WeChatMessage, WeChatMessageDocument } from "./schemas/weChatMessage.schema";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { CustomerException } from "@/core/exceptions/customer.exception";
import sha1 from "sha1";

@Injectable()
export class WeChatService {
  constructor(@InjectModel("WeChatMessages") private readonly weChatMessageModel: Model<WeChatMessageDocument>, private configService: ConfigService) {}

  OPENAI_MODEL = "gpt-3.5-turbo"; // 使用的 AI 模型
  OPENAI_MAX_TOKEN = 120; // 最大 token 的值
  LIMIT_HISTORY_MESSAGES = 50; // 限制历史会话最大条数
  CONVERSATION_MAX_AGE = 60 * 60 * 1000; // 同一会话允许最大周期，默认：1 小时
  ADJACENT_MESSAGE_MAX_INTERVAL = 10 * 60 * 1000; //同一会话相邻两条消息的最大允许间隔时间，默认：10 分钟

  WAIT_MESSAGE = `处理中 ... \n\n请稍等几秒后发送【1】查看回复`;
  NO_MESSAGE = `暂无内容，请稍后回复【1】再试`;
  CLEAR_MESSAGE = `✅ 记忆已清除`;
  HELP_MESSAGE = `ChatGPT 指令使用指南
  Usage:
      1         查看上一次问题的回复
      /clear    清除上下文
      /help     获取更多帮助
    `;

  /* ======== 延迟 ======== */
  sleep(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* ======== 生成xml内容 ======== */
  toTextXML(toUser: string, fromUser: string, content: string) {
    // 生成文本类型的回复消息
    const createTime = new Date().getTime();
    return create({
      xml: {
        ToUserName: fromUser,
        FromUserName: toUser,
        CreateTime: createTime,
        MsgType: "text",
        Content: content
      }
    }).end({ prettyPrint: true });
  }
  /* ======== 清理历史会话 ======== */
  async processCommandText({ fromUser, content }: { fromUser: string; content: string }) {
    if (content === "/clear") {
      await this.weChatMessageModel.findOneAndRemove({ fromUser: fromUser });
      return this.CLEAR_MESSAGE;
    } else {
      return this.HELP_MESSAGE;
    }
  }
  /* ========  构建 prompt ======== */

  async buildOpenAIPrompt(fromUser: any, question: any) {
    const prompt = [];

    // 获取最近的历史会话
    const now = new Date();
    const historyMessages = await this.findAll({ fromUser: fromUser });

    let lastMessageTime: any = now;
    let tokenSize: any = 0;
    if (!historyMessages) {
      return false;
    }
    for (const message of historyMessages) {
      // 如果历史会话记录大于 OPENAI_MAX_TOKEN 或 两次会话间隔超过 10 分钟，则停止添加历史会话
      const timeSinceLastMessage = lastMessageTime ? lastMessageTime - parseInt(message.createTime) : 0;
      if (tokenSize > this.OPENAI_MAX_TOKEN || timeSinceLastMessage > this.ADJACENT_MESSAGE_MAX_INTERVAL) {
        break;
      }

      prompt.unshift({ role: "assistant", content: message.answer });
      prompt.unshift({ role: "user", content: message.content });
      tokenSize += message.token;
      lastMessageTime = message.createTime;
    }

    prompt.push({ role: "user", content: question });
    return prompt;
  }

  /* ======== 获取 OpenAI API 的回复 ======== */
  async getOpenAIReply(prompt: any) {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${this.configService.get<string>("CHATGPT_APIKEY")}`,
        "Content-Type": "application/json"
      },
      model: this.OPENAI_MODEL,
      prompt: prompt,
      max_tokens: this.OPENAI_MAX_TOKEN,
      temperature: 0,
      timeout: 50000
    };

    try {
      const response = await axios(config);
      console.log("%c response", "font-size:13px; background:pink; color:#bf2c9f;", response);
      if (response.status === 429) {
        return {
          error: "问题太多了，我有点眩晕，请稍后再试"
        };
      }
      // 去除多余的换行
      return {
        answer: response.data.choices[0].message.content.replace("\n\n", "")
      };
    } catch (e) {
      console.log("%c e", "font-size:13px; background:pink; color:#bf2c9f;", e);
      return {
        error: "问题太难了 出错了. (uДu〃)."
      };
    }
  }
  // 处理文本回复消息
  async replyText(message: { eventId: string; content: string; fromUser: string; createTime: string }) {
    const { content, eventId, fromUser } = message;

    // 检查是否是重试操作
    if (content === "1") {
      const lastMessage = await this.findOne({ fromUser: fromUser });
      if (lastMessage) {
        return `提问：${lastMessage.content}\n------------\n回答：${lastMessage.answer}`;
      }

      return this.NO_MESSAGE;
    }

    // 发送指令
    if (content?.startsWith("/")) {
      return await this.processCommandText({ content: message.content, fromUser: message.fromUser });
    }

    // OpenAI 回复内容
    const prompt = await this.buildOpenAIPrompt(fromUser, content);
    const { error, answer } = await this.getOpenAIReply(prompt);
    console.log("%c  error, answer ", "font-size:13px; background:pink; color:#bf2c9f;", error, answer);
    if (error) {
      return error;
    }

    // 保存消息
    const token = content?.length + answer.length;
    const result = await this.createData({ answer, token, ...message });

    return answer;
  }

  // 验证是否是重复推送事件
  async checkEvent(payload: any) {
    const eventId = payload.MsgId;
    const count = await this.findOne({ eventId: eventId });
    if (count) {
      return true;
    }

    await this.createData({ eventId: eventId, fromUser: payload.FromUserName, content: payload.Content, createTime: payload.CreateTime });
    return false;
  }

  /* ======== 查询单个 ======== */
  async findOne(query: object): Promise<any> {
    const oneObj = await this.weChatMessageModel.findOne(query);
    return oneObj;
  }
  /* ======== 创建 ======== */
  async createData(createDto: any) {
    const findObj = await this.findOne({ eventId: createDto.eventId });
    if (findObj) {
      // throw new CustomerException(1, "已存在");
      return this.update(createDto);
    }
    const createObj = new this.weChatMessageModel({ ...createDto });
    return createObj.save();
  }
  async update(updateDto: any) {
    const modifyBill = await this.weChatMessageModel.findOneAndUpdate({ eventId: updateDto.eventId }, { ...updateDto });
    return modifyBill;
  }

  async findAll(query: object) {
    const allList = await this.weChatMessageModel.find(query).exec();
    return allList;
  }
  async generateTextReply(msg: { ToUserName: string; FromUserName: string; Content: string; MsgId: string; CreateTime: string }) {
    const newMessage = {
      eventId: msg.MsgId,
      content: msg.Content.trim(),
      fromUser: msg.FromUserName,
      createTime: msg.CreateTime
    };
    // 修复请求响应超时问题：如果 5 秒内 AI 没有回复，则返回等待消息
    const responseText = await Promise.race([this.replyText(newMessage), this.sleep(60000.0).then(() => this.WAIT_MESSAGE)]);
    return this.toTextXML(msg.ToUserName, msg.FromUserName, `服务开发中，您发送的消息是：${responseText}`);
    // return `<xml>
    //   <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
    //   <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
    //   <CreateTime>${msg.CreateTime}</CreateTime>
    //   <MsgType><![CDATA[text]]></MsgType>
    //   <Content><![CDATA[您发送的消息是：${msg.Content}]]></Content>
    // </xml>`;
  }

  /* ======== 关注自动回复 ======== */
  generateFocusOnReply(toUser: string, fromUser: string): string {
    return this.toTextXML(
      toUser,
      fromUser,
      `
    本公众号不提供资源，推荐使用 阅读 app看小说
    GitHub地址：https://github.com/gedoor/legado
    蓝奏云地址：https://kunfei.lanzoui.com/b0f810h4b
    酷安：https://www.coolapk.com/apk/io.legado.app.release
    GitHub下载地址：https://github.com/gedoor/legado/releases
    阅读论坛地址：https://legado.cn/?fromuid=11272

    ${this.HELP_MESSAGE}
    `
    );
  }
}
