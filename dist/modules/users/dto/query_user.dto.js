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
exports.QueryUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QueryUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "pageSize",
        default: "10"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "pageSize不能为空" }),
    (0, class_validator_1.IsString)({ message: "pageSize必须是字符串" }),
    __metadata("design:type", Number)
], QueryUserDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "页数",
        default: "1"
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "页数不能为空" }),
    (0, class_validator_1.IsString)({ message: "页数必须是字符串" }),
    __metadata("design:type", Number)
], QueryUserDto.prototype, "pageNum", void 0);
exports.QueryUserDto = QueryUserDto;
//# sourceMappingURL=query_user.dto.js.map