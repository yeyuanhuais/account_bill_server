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
exports.AssetSchema = exports.Asset = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enum_1 = require("../enum");
const dayjs_1 = __importDefault(require("dayjs"));
const now = (0, dayjs_1.default)().format("YYYY-MM-DD HH:mm:ss");
let Asset = class Asset {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Asset.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Asset.prototype, "color", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Asset.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Asset.prototype, "money", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, enum: enum_1.ASSET_TYPE }),
    __metadata("design:type", Number)
], Asset.prototype, "asset_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, enum: enum_1.TYPE }),
    __metadata("design:type", Number)
], Asset.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Asset.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: now }),
    __metadata("design:type", String)
], Asset.prototype, "create_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: now }),
    __metadata("design:type", String)
], Asset.prototype, "modify_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1, enum: enum_1.STATUS }),
    __metadata("design:type", Number)
], Asset.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1, enum: enum_1.SHOW }),
    __metadata("design:type", Number)
], Asset.prototype, "show", void 0);
Asset = __decorate([
    (0, mongoose_1.Schema)()
], Asset);
exports.Asset = Asset;
exports.AssetSchema = mongoose_1.SchemaFactory.createForClass(Asset);
//# sourceMappingURL=asset.schema.js.map