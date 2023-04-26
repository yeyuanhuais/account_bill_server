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
exports.WeChatyController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../core/decorators/public.decorator");
const crypto = __importStar(require("crypto"));
let WeChatyController = class WeChatyController {
    async verify(req, res) {
        console.log("%c req", "font-size:13px; background:pink; color:#bf2c9f;", req);
        const { signature, timestamp, nonce, echostr } = req.query;
        const token = "yeyuanhuais";
        const list = [token, timestamp, nonce].sort();
        const str = list.join("").toString().replace(/,/g, "");
        const sha1 = crypto.createHash("sha1");
        sha1.update(str, "utf-8");
        const result = sha1.digest("hex");
        console.log("%c result", "font-size:13px; background:pink; color:#bf2c9f;", result);
        if (result === signature) {
            res.send(echostr);
        }
        else {
            res.send("Failed");
        }
    }
    async handleMessage() { }
};
__decorate([
    (0, common_1.Get)("incoming"),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WeChatyController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)("incoming"),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WeChatyController.prototype, "handleMessage", null);
WeChatyController = __decorate([
    (0, common_1.Controller)("wechaty")
], WeChatyController);
exports.WeChatyController = WeChatyController;
//# sourceMappingURL=weChaty.controller.js.map