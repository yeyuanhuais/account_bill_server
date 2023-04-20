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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const customer_exception_1 = require("../../core/exceptions/customer.exception");
const cryptogram_1 = require("../../utils/cryptogram");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(usersModel, configService) {
        this.usersModel = usersModel;
        this.configService = configService;
    }
    async create(createUserDto) {
        const createUser = new this.usersModel(createUserDto);
        return createUser.save();
    }
    async findAll(query) {
        const users = await this.usersModel
            .find()
            .skip(query.pageSize * query.pageNum)
            .limit(query.pageSize)
            .sort({ _id: -1 })
            .exec();
        return users;
    }
    async findOneById(id) {
        const user = await this.usersModel.findById(id);
        return user;
    }
    async findOne(query) {
        const user = await this.usersModel.findOne(query);
        return user;
    }
    async update(id, updateUserDto) {
        const modifyUser = await this.usersModel.findByIdAndUpdate(new mongoose_2.default.Types.ObjectId(id), updateUserDto);
        return modifyUser;
    }
    async remove(id) {
        await this.usersModel.findByIdAndDelete(id);
        return `This action removes a #${id} user`;
    }
    async register(body) {
        const { account, password, rePassword } = body;
        if (password !== rePassword) {
            throw new customer_exception_1.CustomerException(1, "两次密码输入不一致");
        }
        const user = await this.findOne({ account });
        if (user && Object.keys(user).length !== 0) {
            throw new customer_exception_1.CustomerException(1, "用户已存在");
        }
        const salt = (0, cryptogram_1.makeSalt)();
        const hashPwd = (0, cryptogram_1.encryptPassword)(password, salt);
        try {
            await this.create(Object.assign(Object.assign({}, body), { password: hashPwd, salt }));
        }
        catch (error) {
            throw new customer_exception_1.CustomerException(2, error);
        }
        return;
    }
    async wxRegister(body) {
        const password = "Aa123456";
        const salt = (0, cryptogram_1.makeSalt)();
        const hashPwd = (0, cryptogram_1.encryptPassword)(password, salt);
        try {
            const createUser = new this.usersModel(Object.assign(Object.assign({}, body), { password: hashPwd, salt, login_method: "weixin" }));
            return createUser.save();
        }
        catch (error) {
            throw new customer_exception_1.CustomerException(2, error);
        }
    }
    async weixinLogin(code) {
        const res = await axios_1.default.get("https://api.weixin.qq.com/sns/jscode2session", {
            params: { appid: this.configService.get("appid"), secret: this.configService.get("secret"), js_code: code, grant_type: "authorization_code" }
        });
        if (res.data.errcode === 40029) {
            throw new customer_exception_1.CustomerException(3, "登录凭证无效");
        }
        else if (res.data.errcode === 45011) {
            throw new customer_exception_1.CustomerException(1, "调用太频繁，请稍候再试");
        }
        else if (res.data.errcode === 40226) {
            throw new customer_exception_1.CustomerException(1, "高风险等级用户，小程序登录拦截 ");
        }
        else if (res.data.errcode === -1) {
            throw new customer_exception_1.CustomerException(1, "系统繁忙，请稍候再试 ");
        }
        else if (res.data.errcode) {
            throw new customer_exception_1.CustomerException(1, res.data.errmsg);
        }
        return res.data;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Users")),
    __metadata("design:paramtypes", [mongoose_2.Model, config_1.ConfigService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map