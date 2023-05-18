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
const crypto = __importStar(require("crypto"));
const config_1 = require("@nestjs/config");
const wechat_service_1 = require("./wechat.service");
let WeChatyController = class WeChatyController {
    constructor(configService, weChatService) {
        this.configService = configService;
        this.weChatService = weChatService;
        this.UNSUPPORTED_MESSAGE_TYPES = {
            image: "暂不支持图片消息",
            voice: "暂不支持语音消息",
            video: "暂不支持视频消息",
            music: "暂不支持音乐消息",
            news: "暂不支持图文消息"
        };
    }
    async verify(req, res) {
        const { signature, timestamp, nonce, echostr } = req.query;
        const token = this.configService.get("WECHATY_PUPPET_PADPLUS_TOKEN");
        const list = [token, timestamp, nonce].sort();
        const str = list.join("").toString().replace(/,/g, "");
        const sha1 = crypto.createHash("sha1");
        sha1.update(str, "utf-8");
        const result = sha1.digest("hex");
        if (result === signature) {
            res.send(echostr);
        }
        else {
            res.send("Failed");
        }
    }
    async handleMessage(body, res) {
        const { xml } = body;
        console.log("%c xml", "font-size:13px; background:pink; color:#bf2c9f;", xml);
        const msgType = xml.MsgType.toLowerCase();
        const duplicatedEvent = await this.weChatService.checkEvent(xml);
        if (duplicatedEvent) {
            res.send("");
        }
        switch (msgType) {
            case "text":
                const response = this.weChatService.generateTextReply(xml.ToUserName, xml.FromUserName, xml.Content, xml.MsgId);
                res.type("application/xml");
                res.send(response);
                break;
            case "event":
                switch (xml.Event) {
                    case "unsubscribe":
                        break;
                    case "subscribe":
                        const response = this.weChatService.generateFocusOnReply(xml.ToUserName, xml.FromUserName);
                        res.type("application/xml");
                        res.send(response);
                        break;
                    default:
                        res.send("");
                        break;
                }
                break;
            default:
                if (msgType in this.UNSUPPORTED_MESSAGE_TYPES) {
                    const response = this.weChatService.toTextXML(xml.ToUserName, xml.FromUserName, this.UNSUPPORTED_MESSAGE_TYPES[msgType]);
                    res.type("application/xml");
                    res.send(response);
                }
                break;
        }
    }
};
__decorate([
    (0, common_1.Get)("incoming"),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WeChatyController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)("incoming"),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WeChatyController.prototype, "handleMessage", null);
WeChatyController = __decorate([
    (0, common_1.Controller)("wechaty"),
    __metadata("design:paramtypes", [config_1.ConfigService, wechat_service_1.WeChatService])
], WeChatyController);
exports.WeChatyController = WeChatyController;
//# sourceMappingURL=weChaty.controller.js.map