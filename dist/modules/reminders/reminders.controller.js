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
exports.RemindersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reminders_service_1 = require("./reminders.service");
const create_reminder_dto_1 = require("./dto/create_reminder.dto");
const update_reminder_dto_1 = require("./dto/update_reminder.dto");
let RemindersController = class RemindersController {
    constructor(remindersService) {
        this.remindersService = remindersService;
    }
    async create(createReminderDto, request) {
        await this.remindersService.create(createReminderDto, request.user);
        return;
    }
    findAll(query) {
        return this.remindersService.findAll(query);
    }
    findOne(id) {
        return this.remindersService.findOneById(id);
    }
    async update(id, updateReminderDto, request) {
        await this.remindersService.update(id, updateReminderDto, request.user);
        return;
    }
    async remove(id) {
        await this.remindersService.remove(id);
        return;
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({
        description: "创建提醒",
        type: create_reminder_dto_1.CreateReminderDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "创建提醒", description: "创建提醒" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reminder_dto_1.CreateReminderDto, Object]),
    __metadata("design:returntype", Promise)
], RemindersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("findAll"),
    (0, swagger_1.ApiOperation)({ summary: "提醒列表", description: "提醒列表" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RemindersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RemindersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({
        description: "编辑提醒",
        type: update_reminder_dto_1.UpdateReminderDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "编辑提醒", description: "编辑提醒" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reminder_dto_1.UpdateReminderDto, Object]),
    __metadata("design:returntype", Promise)
], RemindersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("remove/:id"),
    (0, swagger_1.ApiOperation)({ summary: "删除提醒", description: "删除提醒" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RemindersController.prototype, "remove", null);
RemindersController = __decorate([
    (0, common_1.Controller)("reminders"),
    (0, swagger_1.ApiTags)("设置提醒"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [reminders_service_1.RemindersService])
], RemindersController);
exports.RemindersController = RemindersController;
//# sourceMappingURL=reminders.controller.js.map