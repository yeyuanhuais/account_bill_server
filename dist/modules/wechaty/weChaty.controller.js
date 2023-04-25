"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeChatyController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../core/decorators/public.decorator");
const xml2js = __importStar(require("xml2js"));
let WeChatyController = class WeChatyController {
    async handleMessage(req, res) {
        let xml = "";
        req.on("data", chunk => {
            xml += chunk;
        });
        req.on("end", () => {
            xml2js.parseString(xml, async (_err, result) => {
                const message = result.xml;
                const content = message.Content[0];
                const fromUserName = message.FromUserName[0];
                const toUserName = message.ToUserName[0];
                const createTime = message.CreateTime[0];
                const replyContent = `你发送的消息是：${content}`;
                const replyMsg = `<xml>
                          <ToUserName><![CDATA[${fromUserName}]]></ToUserName>
                          <FromUserName><![CDATA[${toUserName}]]></FromUserName>
                          <CreateTime>${createTime}</CreateTime>
                          <MsgType><![CDATA[text]]></MsgType>
                          <Content><![CDATA[${replyContent}]]></Content>
                        </xml>`;
                res.send(replyMsg);
            });
        });
    }
};
__decorate([
    (0, common_1.Post)("incoming"),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WeChatyController.prototype, "handleMessage", null);
WeChatyController = __decorate([
    (0, common_1.Controller)("message")
], WeChatyController);
exports.WeChatyController = WeChatyController;
//# sourceMappingURL=weChaty.controller.js.map