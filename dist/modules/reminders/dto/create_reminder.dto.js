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
exports.CreateReminderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateReminderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "名称名称",
        default: "名称名称"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "名称名称不能为空" }),
    (0, class_validator_1.IsString)({ message: "名称名称必须是字符串" }),
    __metadata("design:type", String)
], CreateReminderDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "状态",
        default: "状态"
    }),
    (0, class_validator_1.IsString)({ message: "必须是字符串" }),
    __metadata("design:type", Number)
], CreateReminderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "分类类型 1-系统提醒 2-用户自定义提醒",
        default: "1"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "类型不能为空" }),
    (0, class_validator_1.IsEnum)({ 系统提醒: 1, 用户自定义提醒: 2 }, {
        message: "类型只能传入1或2"
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateReminderDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "时间",
        default: "00:00:00"
    }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateReminderDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "每月的几号或者每周的星期几",
        default: "1"
    }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateReminderDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "周期",
        default: "1"
    }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateReminderDto.prototype, "cycle", void 0);
exports.CreateReminderDto = CreateReminderDto;
//# sourceMappingURL=create_reminder.dto.js.map