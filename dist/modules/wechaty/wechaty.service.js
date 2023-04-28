"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeChatyService = void 0;
const common_1 = require("@nestjs/common");
const xmlbuilder2_1 = require("xmlbuilder2");
let WeChatyService = class WeChatyService {
    generateTextReply(toUser, fromUser, content) {
        const createTime = new Date().getTime();
        return (0, xmlbuilder2_1.create)({
            xml: {
                ToUserName: fromUser,
                FromUserName: toUser,
                CreateTime: createTime,
                MsgType: "text",
                Content: `服务开发中，您发送的消息是：${content}`
            }
        }).end({ prettyPrint: true });
        return `<xml>
      <ToUserName><![CDATA[${fromUser}]]></ToUserName>
      <FromUserName><![CDATA[${toUser}]]></FromUserName>
      <CreateTime>${createTime}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[您发送的消息是：${content}]]></Content>
    </xml>`;
    }
};
WeChatyService = __decorate([
    (0, common_1.Injectable)()
], WeChatyService);
exports.WeChatyService = WeChatyService;
//# sourceMappingURL=wechaty.service.js.map