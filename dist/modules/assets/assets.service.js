"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsService = void 0;
const customer_exception_1 = require("../../core/exceptions/customer.exception");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
let AssetsService = class AssetsService {
    constructor(assetModel) {
        this.assetModel = assetModel;
    }
    async create(createAssetDto, user) {
        const asset = await this.findOne({ user_id: user.id, name: createAssetDto.name });
        if (asset) {
            throw new customer_exception_1.CustomerException(1, "该账户已存在");
        }
        const createAsset = new this.assetModel(Object.assign(Object.assign({}, createAssetDto), { user_id: user.id }));
        return createAsset.save();
    }
    async findAll(query) {
        const assets = await this.assetModel.find(query).exec();
        return assets;
    }
    async findOneById(id) {
        const asset = await this.assetModel.findById(id);
        return asset;
    }
    async findOne(query) {
        const asset = await this.assetModel.findOne(query);
        return asset;
    }
    async update(id, updateAssetDto, user) {
        const { name, type, icon } = updateAssetDto;
        const asset = await this.findOne({ user_id: user.id, name });
        if (asset) {
            throw new customer_exception_1.CustomerException(1, "该账户名称已存在");
        }
        const modifyAsset = await this.assetModel.findOneAndUpdate({ _id: new mongoose_2.default.Types.ObjectId(id) }, { name, type, icon });
        return modifyAsset;
    }
    async remove(id) {
        const removeAsset = await this.assetModel.findOneAndRemove({ _id: new mongoose_2.default.Types.ObjectId(id) });
        return removeAsset;
    }
};
AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Assets")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssetsService);
exports.AssetsService = AssetsService;
//# sourceMappingURL=assets.service.js.map