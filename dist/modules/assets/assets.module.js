"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsModule = void 0;
const common_1 = require("@nestjs/common");
const assets_service_1 = require("./assets.service");
const assets_controller_1 = require("./assets.controller");
const mongoose_1 = require("@nestjs/mongoose");
const asset_schema_1 = require("./schemas/asset.schema");
let AssetsModule = class AssetsModule {
};
AssetsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "Assets", schema: asset_schema_1.AssetSchema }])],
        controllers: [assets_controller_1.AssetsController],
        providers: [assets_service_1.AssetsService]
    })
], AssetsModule);
exports.AssetsModule = AssetsModule;
//# sourceMappingURL=assets.module.js.map