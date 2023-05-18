"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const xmlbuilder2_1 = require("xmlbuilder2");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let WeChatService = class WeChatService {
    constructor(weChatMessageModel, configService) {
        this.weChatMessageModel = weChatMessageModel;
        this.configService = configService;
        this.OPENAI_MODEL = "gpt-3.5-turbo";
        this.OPENAI_MAX_TOKEN = 120;
        this.LIMIT_HISTORY_MESSAGES = 50;
        this.CONVERSATION_MAX_AGE = 60 * 60 * 1000;
        this.ADJACENT_MESSAGE_MAX_INTERVAL = 10 * 60 * 1000;
        this.WAIT_MESSAGE = `处理中 ... \n\n请稍等几秒后发送【1】查看回复`;
        this.NO_MESSAGE = `暂无内容，请稍后回复【1】再试`;
        this.CLEAR_MESSAGE = `✅ 记忆已清除`;
        this.HELP_MESSAGE = `ChatGPT 指令使用指南
  Usage:
      1         查看上一次问题的回复
      /clear    清除上下文
      /help     获取更多帮助
    `;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    toTextXML(toUser, fromUser, content) {
        const createTime = new Date().getTime();
        return (0, xmlbuilder2_1.create)({
            xml: {
                ToUserName: fromUser,
                FromUserName: toUser,
                CreateTime: createTime,
                MsgType: "text",
                Content: content
            }
        }).end({ prettyPrint: true });
    }
    async processCommandText({ fromUser, content }) {
        if (content === "/clear") {
            await this.weChatMessageModel.findOneAndRemove({ fromUser: fromUser });
            return this.CLEAR_MESSAGE;
        }
        else {
            return this.HELP_MESSAGE;
        }
    }
    async buildOpenAIPrompt(fromUser, question) {
        const prompt = [];
        const now = new Date();
        const historyMessages = await this.findAll({ fromUser: fromUser });
        let lastMessageTime = now;
        let tokenSize = 0;
        if (!historyMessages) {
            return false;
        }
        for (const message of historyMessages) {
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
    async getOpenAIReply(prompt) {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://api.openai.com/v1/chat/completions",
            headers: {
                Authorization: `Bearer ${this.configService.get("CHATGPT_APIKEY")}`,
                "Content-Type": "application/json"
            },
            model: this.OPENAI_MODEL,
            prompt: "你好",
            max_tokens: this.OPENAI_MAX_TOKEN,
            temperature: 0,
            timeout: 50000
        };
        try {
            const response = await (0, axios_1.default)(config);
            console.log("%c response", "font-size:13px; background:pink; color:#bf2c9f;", response);
            if (response.status === 429) {
                return {
                    error: "问题太多了，我有点眩晕，请稍后再试"
                };
            }
            return {
                answer: response.data.choices[0].message.content.replace("\n\n", "")
            };
        }
        catch (e) {
            console.log("%c e", "font-size:13px; background:pink; color:#bf2c9f;", e);
            return {
                error: "问题太难了 出错了. (uДu〃)."
            };
        }
    }
    async replyText(message) {
        const { content, eventId, fromUser } = message;
        if (content === "1") {
            const lastMessage = await this.findOne({ fromUser: fromUser });
            if (lastMessage) {
                return `${lastMessage.content}\n------------\n${lastMessage.answer}`;
            }
            return this.NO_MESSAGE;
        }
        if (content === null || content === void 0 ? void 0 : content.startsWith("/")) {
            return await this.processCommandText({ content: message.content, fromUser: message.fromUser });
        }
        const prompt = await this.buildOpenAIPrompt(fromUser, content);
        const { error, answer } = await this.getOpenAIReply(prompt);
        console.log("%c  error, answer ", "font-size:13px; background:pink; color:#bf2c9f;", error, answer);
        if (error) {
            return error;
        }
        const token = (content === null || content === void 0 ? void 0 : content.length) + answer.length;
        const result = await this.createData(Object.assign({ answer, token }, message));
        return answer;
    }
    async checkEvent(payload) {
        const eventId = payload.MsgId;
        const count = await this.findOne({ eventId: eventId });
        if (count) {
            return true;
        }
        await this.createData({ eventId: eventId, fromUser: payload.FromUserName, content: payload.Content, createTime: payload.CreateTime });
        return false;
    }
    async findOne(query) {
        const oneObj = await this.weChatMessageModel.findOne(query);
        return oneObj;
    }
    async createData(createDto) {
        const findObj = await this.findOne({ eventId: createDto.eventId });
        if (findObj) {
            return findObj;
        }
        const createObj = new this.weChatMessageModel(Object.assign({}, createDto));
        return createObj.save();
    }
    async findAll(query) {
        const allList = await this.weChatMessageModel.find(query).exec();
        return allList;
    }
    async generateTextReply(msg) {
        const newMessage = {
            eventId: msg.MsgId,
            content: msg.Content.trim(),
            fromUser: msg.FromUserName,
            createTime: msg.CreateTime
        };
        const responseText = await Promise.race([this.replyText(newMessage), this.sleep(4000.0).then(() => this.WAIT_MESSAGE)]);
        return this.toTextXML(msg.ToUserName, msg.FromUserName, `服务开发中，您发送的消息是：${responseText}`);
    }
    generateFocusOnReply(toUser, fromUser) {
        return this.toTextXML(toUser, fromUser, `
    本公众号不提供资源，推荐使用 阅读 app看小说
    GitHub地址：https://github.com/gedoor/legado
    蓝奏云地址：https://kunfei.lanzoui.com/b0f810h4b
    酷安：https://www.coolapk.com/apk/io.legado.app.release
    GitHub下载地址：https://github.com/gedoor/legado/releases
    阅读论坛地址：https://legado.cn/?fromuid=11272

    ${this.HELP_MESSAGE}
    `);
    }
};
WeChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("WeChatMessages")),
    __metadata("design:paramtypes", [mongoose_2.Model, config_1.ConfigService])
], WeChatService);
exports.WeChatService = WeChatService;
//# sourceMappingURL=wechat.service.js.map