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
exports.FindUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class FindUserDto {
    constructor() {
        this.status = 1;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "账号",
        default: "18160999831"
    }),
    __metadata("design:type", String)
], FindUserDto.prototype, "account", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "密码",
        default: "18160999831"
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], FindUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "手机号",
        default: "18160999831"
    }),
    __metadata("design:type", String)
], FindUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "邮件",
        default: "18160999831@qq.com"
    }),
    __metadata("design:type", String)
], FindUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "状态 0-停用 1-正常",
        default: "1"
    }),
    __metadata("design:type", Number)
], FindUserDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "创建时间",
        default: "1"
    }),
    __metadata("design:type", String)
], FindUserDto.prototype, "create_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "修改时间",
        default: "1"
    }),
    __metadata("design:type", String)
], FindUserDto.prototype, "modify_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "密码盐",
        default: "1"
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], FindUserDto.prototype, "salt", void 0);
exports.FindUserDto = FindUserDto;
//# sourceMappingURL=find_user.dto.js.map