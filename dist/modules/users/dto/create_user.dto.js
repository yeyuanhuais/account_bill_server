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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    constructor() {
        this.status = 1;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "账号",
        default: "18160999831"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "账号不能为空" }),
    (0, class_validator_1.IsString)({ message: "账号必须是字符串" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "account", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "密码",
        default: "18160999831"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "密码不能为空" }),
    (0, class_validator_1.IsString)({ message: "密码必须是字符串" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "确认密码",
        default: "18160999831"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "确认密码不能为空" }),
    (0, class_validator_1.IsString)({ message: "确认密码必须是字符串" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "rePassword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "手机号",
        default: "18160999831"
    }),
    (0, class_validator_1.IsMobilePhone)("zh-CN", {}, { message: "手机号码格式错误" }),
    (0, class_validator_1.IsString)({ message: "手机号必须是字符串" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "邮件",
        default: "18160999831@qq.com"
    }),
    (0, class_validator_1.IsEmail)({}, { message: "邮箱格式错误" }),
    (0, class_validator_1.IsString)({ message: "邮件必须是字符串" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "状态 0-停用 1-正常",
        default: "1"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)({ 禁用: 0, 正常: 1 }, {
        message: "状态只能传入0或1"
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "登录方式",
        default: "1"
    }),
    (0, class_validator_1.IsString)({ message: "登录方式必须是字符串" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "login_method", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "密码盐",
        default: "1"
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "salt", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create_user.dto.js.map