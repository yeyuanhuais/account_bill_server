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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assets_service_1 = require("./assets.service");
const create_asset_dto_1 = require("./dto/create_asset.dto");
const update_asset_dto_1 = require("./dto/update_asset.dto");
let AssetsController = class AssetsController {
    constructor(assetsService) {
        this.assetsService = assetsService;
    }
    async create(createAssetDto, request) {
        await this.assetsService.create(createAssetDto, request.user);
        return;
    }
    async findAll(request) {
        const assets = await this.assetsService.findAll({ asset_type: 1, user_id: request.id });
        const assets_money = assets.reduce((pre, cur) => cur.money + pre, 0);
        const liabilities = await this.assetsService.findAll({ asset_type: 2, user_id: request.id });
        const liabilities_money = assets.reduce((pre, cur) => cur.money + pre, 0);
        const netAssets = assets_money - liabilities_money;
        return [
            { title: "资产", assets: assets_money, netAssets, childData: assets },
            {
                title: "负债",
                assets: liabilities_money,
                childData: liabilities
            }
        ];
    }
    findOne(id) {
        return this.assetsService.findOneById(id);
    }
    async update(id, updateAssetDto, request) {
        await this.assetsService.update(id, updateAssetDto, request.user);
        return;
    }
    async remove(id) {
        await this.assetsService.remove(id);
        return;
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({
        description: "创建资产",
        type: create_asset_dto_1.CreateAssetDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "创建资产", description: "创建资产" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_asset_dto_1.CreateAssetDto, Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("findAll"),
    (0, swagger_1.ApiOperation)({ summary: "资产列表", description: "资产列表" }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({
        description: "编辑资产",
        type: update_asset_dto_1.UpdateAssetDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "编辑资产", description: "编辑资产" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_asset_dto_1.UpdateAssetDto, Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("remove/:id"),
    (0, swagger_1.ApiOperation)({ summary: "删除资产", description: "删除资产" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "remove", null);
AssetsController = __decorate([
    (0, common_1.Controller)("assets"),
    (0, swagger_1.ApiTags)("资产"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [assets_service_1.AssetsService])
], AssetsController);
exports.AssetsController = AssetsController;
//# sourceMappingURL=assets.controller.js.map