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
exports.RemindersService = void 0;
const customer_exception_1 = require("../../core/exceptions/customer.exception");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
let RemindersService = class RemindersService {
    constructor(reminderModel) {
        this.reminderModel = reminderModel;
    }
    async create(createReminderDto, user) {
        const reminder = await this.findOne({ user_id: user.id, name: createReminderDto.name });
        if (reminder) {
            throw new customer_exception_1.CustomerException(1, "该提醒已存在");
        }
        const createReminder = new this.reminderModel(Object.assign(Object.assign({}, createReminderDto), { user_id: user.id }));
        return createReminder.save();
    }
    async findAll(query) {
        const reminders = await this.reminderModel.find(query).exec();
        return reminders;
    }
    async findOneById(id) {
        const reminder = await this.reminderModel.findById(id);
        return reminder;
    }
    async findOne(query) {
        const reminder = await this.reminderModel.findOne(query);
        return reminder;
    }
    async update(id, updateReminderDto, user) {
        const { name, type } = updateReminderDto;
        const reminder = await this.findOne({ user_id: user.id, name });
        if (reminder) {
            throw new customer_exception_1.CustomerException(1, "该提醒名称已存在");
        }
        const modifyReminder = await this.reminderModel.findOneAndUpdate({ _id: new mongoose_2.default.Types.ObjectId(id) }, { name, type });
        return modifyReminder;
    }
    async remove(id) {
        const removeReminder = await this.reminderModel.findOneAndRemove({ _id: new mongoose_2.default.Types.ObjectId(id) });
        return removeReminder;
    }
};
RemindersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Reminders")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RemindersService);
exports.RemindersService = RemindersService;
//# sourceMappingURL=reminders.service.js.map