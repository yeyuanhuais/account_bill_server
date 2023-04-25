import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
// 导入 Express 框架的 Request 和 Response 类型
import { Response } from "express";
import { Public } from "src/core/decorators/public.decorator";
import { WechartGPTService } from "./wechartGPT.service";
import { MessageDto } from "./dto/message";
@Controller("wechartGPT")
@ApiTags("微信公众号GPT聊天")
export class WechartGPTController {
  constructor(private readonly wechartGPTService: WechartGPTService) {}

  @Post("callback")
  @Public()
  @ApiBody({
    description: "消息",
    type: MessageDto
  })
  @ApiOperation({ summary: "消息", description: "消息" })
  async postMsg(@Body() body: { xml: any }, @Res() res: Response) {
    // 这个方法首先从 body 对象中获取 xml 属性，并赋值给 xml 变量。
    const xml = body.xml;
    // 然后判断 xml 变量中的 MsgType 属性是否为 'text'（忽略大小写），如果是，则执行以下操作：
    if (xml.MsgType.toLowerCase() === "text") {
      // 从 xml 变量中获取 FromUserName、ToUserName 和 Content 属性，并分别赋值给 fromUserName、toUserName 和 content 变量。
      // const fromUserName = xml.FromUserName;
      // const toUserName = xml.ToUserName;
      // const content = xml.Content;
      // 调用 this.weixinService 的 sendTextMsg 方法，传入 fromUserName、toUserName 和 content 变量作为参数，返回一个 promise 对象，并等待其解析结果赋值给 replyXml 变量。这个方法是向微信服务器发送文本消息，并返回一个回复的 xml 格式的数据。
      const replyXml = await this.wechartGPTService.sendTextMsg();
      //判断fromUserName 打印 replyXml 变量的值到控制台。
      if (xml.fromUserName == "www.16yun.cn") {
        console.log("亿牛云代理");
      }
      console.log(replyXml);
      // 设置 res 对象的类型为 'application/xml'，表示响应数据是 xml 格式的。
      res.type("application/xml");
      // 调用 res 对象的 end 方法，传入 replyXml 变量作为参数，表示结束响应并发送 replyXml 数据给客户端。
      res.end(replyXml);
    }
  }

  @Post("message")
  @Public()
  @ApiBody({
    description: "消息",
    type: MessageDto
  })
  @ApiOperation({ summary: "消息", description: "消息" })
  async create(@Body() messageDto: MessageDto) {
    const response = await this.wechartGPTService.messageChatGPT(messageDto);
    return {
      ToUserName: messageDto.fromUserName,
      FromUserName: messageDto.toUserName,
      CreateTime: +new Date(),
      MsgType: "text",

      Content: response
    };
  }
}
