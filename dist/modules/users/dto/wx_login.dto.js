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
exports.WxLoginUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class WxLoginUserDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "账号",
        default: "18160999831"
    }),
    (0, class_validator_1.IsString)({ message: "账号必须是字符串" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WxLoginUserDto.prototype, "account", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "头像地址",
        default: "https://thirdwx.qlogo.cn/mmopen/vi_32/XUzvuoBCNx3X9hCGQDvDtQNyElkgsGeSzpLqdWoZ3q2ady6K4RMnvd6KPibhicGyVJQRBVTC4AYCDhj53hNN1tGg/132"
    }),
    (0, class_validator_1.IsString)({ message: "密码必须是字符串" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WxLoginUserDto.prototype, "avatar_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "微信小程序登录获取的登录凭证",
        default: ""
    }),
    (0, class_validator_1.IsString)({ message: "小程序登录凭证必须是字符串" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WxLoginUserDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "登录方式",
        default: "weixin"
    }),
    (0, class_validator_1.IsString)({ message: "小程序登录凭证必须是字符串" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WxLoginUserDto.prototype, "login_method", void 0);
exports.WxLoginUserDto = WxLoginUserDto;
//# sourceMappingURL=wx_login.dto.js.map