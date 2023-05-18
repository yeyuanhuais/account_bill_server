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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeChatMessageSchema = exports.WeChatMessage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const dayjs_1 = __importDefault(require("dayjs"));
const now = (0, dayjs_1.default)().format("YYYY-MM-DD HH:mm:ss");
let WeChatMessage = class WeChatMessage {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WeChatMessage.prototype, "fromUser", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WeChatMessage.prototype, "eventId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WeChatMessage.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WeChatMessage.prototype, "answer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WeChatMessage.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WeChatMessage.prototype, "createTime", void 0);
WeChatMessage = __decorate([
    (0, mongoose_1.Schema)()
], WeChatMessage);
exports.WeChatMessage = WeChatMessage;
exports.WeChatMessageSchema = mongoose_1.SchemaFactory.createForClass(WeChatMessage);
//# sourceMappingURL=weChatMessage.schema.js.map