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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WxCreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class WxCreateUserDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "微信用户唯一标识",
        default: "1"
    }),
    __metadata("design:type", String)
], WxCreateUserDto.prototype, "openid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "微信会话密钥",
        default: "1"
    }),
    __metadata("design:type", String)
], WxCreateUserDto.prototype, "session_key", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "微信昵称",
        default: "1"
    }),
    __metadata("design:type", String)
], WxCreateUserDto.prototype, "account", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "微信头像",
        default: "1"
    }),
    __metadata("design:type", String)
], WxCreateUserDto.prototype, "avatar_url", void 0);
exports.WxCreateUserDto = WxCreateUserDto;
//# sourceMappingURL=wx_create_user.dto.js.map