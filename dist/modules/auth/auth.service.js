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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const cryptogram_1 = require("../../utils/cryptogram");
const customer_exception_1 = require("../../core/exceptions/customer.exception");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser({ account, password }) {
        const user = await this.usersService.findOne({ account });
        if (user && Object.keys(user).length === 0) {
            throw new customer_exception_1.CustomerException(3, "该用户不存在");
        }
        const hashedPassword = user === null || user === void 0 ? void 0 : user.password;
        const salt = user === null || user === void 0 ? void 0 : user.salt;
        const hashPassword = (0, cryptogram_1.encryptPassword)(password, salt);
        if (hashedPassword === hashPassword) {
            return user;
        }
        else {
            throw new customer_exception_1.CustomerException(3, "账号或密码不正确");
        }
    }
    async certificate(user) {
        const payload = {
            account: user === null || user === void 0 ? void 0 : user.account,
            id: (user._id || "").toString(),
            openid: user === null || user === void 0 ? void 0 : user.openid,
            session_key: user === null || user === void 0 ? void 0 : user.session_key
        };
        try {
            const token = this.jwtService.sign(payload);
            return { token, avatar_url: user.avatar_url, account: user.account };
        }
        catch (error) {
            throw new customer_exception_1.CustomerException(3, "token生成失败");
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map