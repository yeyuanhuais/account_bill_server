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
exports.CreateClassifyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateClassifyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "分类名称",
        default: "分类名称"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "分类名称不能为空" }),
    (0, class_validator_1.IsString)({ message: "分类名称必须是字符串" }),
    __metadata("design:type", String)
], CreateClassifyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "分类图标",
        default: "分类图标"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "分类图标不能为空" }),
    (0, class_validator_1.IsString)({ message: "分类图标必须是字符串" }),
    __metadata("design:type", String)
], CreateClassifyDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "分类类型 1-收入 2-支出",
        default: "1"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "分类类型不能为空" }),
    (0, class_validator_1.IsEnum)({ 收入: 1, 支出: 2 }, {
        message: "分类类型只能传入1或2"
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateClassifyDto.prototype, "type", void 0);
exports.CreateClassifyDto = CreateClassifyDto;
//# sourceMappingURL=create_classify.dto.js.map