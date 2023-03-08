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
exports.UsersController = void 0;
const customer_exception_1 = require("../../core/exceptions/customer.exception");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../core/decorators/public.decorator");
const auth_service_1 = require("../auth/auth.service");
const create_user_dto_1 = require("./dto/create_user.dto");
const find_user_dto_1 = require("./dto/find_user.dto");
const login_dto_1 = require("./dto/login.dto");
const update_user_dto_1 = require("./dto/update_user.dto");
const wx_login_dto_1 = require("./dto/wx_login.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAll(query) {
        const users = await this.usersService.findAll(query);
        return users;
    }
    findOne(id) {
        return this.usersService.findOneById(+id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
    register(createUserDto) {
        return this.usersService.register(createUserDto);
    }
    async login(loginUserDto) {
        const { account, password } = loginUserDto;
        const authResult = await this.authService.validateUser({ account, password });
        if (authResult) {
            return this.authService.certificate(authResult);
        }
        throw new customer_exception_1.CustomerException(3, "用户不存在");
    }
    async wxLogin(wxLoginUserDto) {
        const { login_method, code } = wxLoginUserDto;
        if (login_method === "weixin") {
            const result = await this.usersService.weixinLogin(code);
            const findUser = await this.usersService.findOne({ openid: result.openid });
            console.log("%c findUser", "font-size:13px; background:pink; color:#bf2c9f;", findUser);
            if (!findUser) {
                const user = await this.usersService.wxRegister(Object.assign(Object.assign({}, result), wxLoginUserDto));
                return this.authService.certificate(user);
            }
            else {
                const user = await this.usersService.update(findUser === null || findUser === void 0 ? void 0 : findUser.id.toString(), Object.assign(Object.assign({}, result), wxLoginUserDto));
                return this.authService.certificate(user || findUser);
            }
        }
        throw new customer_exception_1.CustomerException(1, "登录方式必须为微信");
    }
};
__decorate([
    (0, common_1.Post)("add"),
    (0, swagger_1.ApiBody)({
        description: "添加用户",
        type: create_user_dto_1.CreateUserDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "创建用户", description: "创建用户" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("findAll"),
    (0, swagger_1.ApiOperation)({ summary: "查找全部用户", description: "查找全部用户" }),
    (0, swagger_1.ApiQuery)({ name: "pageSize", required: true }),
    (0, swagger_1.ApiQuery)({ name: "pageNum", required: true }),
    (0, swagger_1.ApiResponse)({ type: find_user_dto_1.FindUserDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "根据ID查找用户" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "修改用户" }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto, description: "修改用户" }),
    (0, swagger_1.ApiResponse)({
        description: "成功返回0",
        type: update_user_dto_1.UpdateUserDto
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "删除用户" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiBody)({
        description: "注册用户",
        type: create_user_dto_1.CreateUserDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "注册用户", description: "注册用户" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "登录用户", description: "登录用户" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("wxLogin"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "微信登录用户", description: "微信用户" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wx_login_dto_1.WxLoginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "wxLogin", null);
UsersController = __decorate([
    (0, common_1.Controller)("users"),
    (0, swagger_1.ApiTags)("用户模块"),
    __metadata("design:paramtypes", [users_service_1.UsersService, auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map