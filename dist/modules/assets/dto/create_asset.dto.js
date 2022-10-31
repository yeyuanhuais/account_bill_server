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
exports.CreateAssetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_1 = require("../enum");
class CreateAssetDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "资产名称",
        default: "资产名称"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "资产名称不能为空" }),
    (0, class_validator_1.IsString)({ message: "资产名称必须是字符串" }),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "资产颜色",
        default: "资产颜色"
    }),
    (0, class_validator_1.IsString)({ message: "资产颜色必须是字符串" }),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "资产图标",
        default: "资产图标"
    }),
    (0, class_validator_1.IsString)({ message: "资产图标必须是字符串" }),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "资产",
        default: "资产"
    }),
    (0, class_validator_1.IsString)({ message: "资产必须是字符串" }),
    __metadata("design:type", Number)
], CreateAssetDto.prototype, "money", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "资产类型 资产 = 1,负债 = 2",
        default: "1"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "资产类型不能为空" }),
    (0, class_validator_1.IsEnum)(enum_1.ASSET_TYPE, {
        message: "资产类型只能传入1或2"
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateAssetDto.prototype, "asset_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "账户类型 ",
        default: "1"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "账户类型不能为空" }),
    (0, class_validator_1.IsEnum)(enum_1.TYPE, {
        message: "账户类型只能传入1或2"
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateAssetDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "展示状态 1-收入 2-支出",
        default: "1"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "展示状态不能为空" }),
    (0, class_validator_1.IsEnum)(enum_1.SHOW, {
        message: "展示状态只能传入1或2"
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateAssetDto.prototype, "show", void 0);
exports.CreateAssetDto = CreateAssetDto;
//# sourceMappingURL=create_asset.dto.js.map