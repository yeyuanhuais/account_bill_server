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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechartGPTController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../core/decorators/public.decorator");
const wechartGPT_service_1 = require("./wechartGPT.service");
const message_1 = require("./dto/message");
let WechartGPTController = class WechartGPTController {
    constructor(wechartGPTService) {
        this.wechartGPTService = wechartGPTService;
    }
    async create(messageDto) {
        const response = await this.wechartGPTService.messageChatGPT(messageDto);
        console.log("%c response", "font-size:13px; background:pink; color:#bf2c9f;", response);
        return {
            ToUserName: messageDto.fromUserName,
            FromUserName: messageDto.toUserName,
            CreateTime: +new Date(),
            MsgType: "text",
            Content: response
        };
    }
};
__decorate([
    (0, common_1.Post)("message"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiBody)({
        description: "消息",
        type: message_1.MessageDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "消息", description: "消息" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_1.MessageDto]),
    __metadata("design:returntype", Promise)
], WechartGPTController.prototype, "create", null);
WechartGPTController = __decorate([
    (0, common_1.Controller)("wechartGPT"),
    (0, swagger_1.ApiTags)("微信公众号GPT聊天"),
    __metadata("design:paramtypes", [wechartGPT_service_1.WechartGPTService])
], WechartGPTController);
exports.WechartGPTController = WechartGPTController;
//# sourceMappingURL=wechartGPT.controller.js.map