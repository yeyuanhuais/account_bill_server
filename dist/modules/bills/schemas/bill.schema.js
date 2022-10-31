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
exports.BillSchema = exports.Bill = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const dayjs_1 = __importDefault(require("dayjs"));
const now = (0, dayjs_1.default)().format("YYYY-MM-DD HH:mm:ss");
let Bill = class Bill {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Bill.prototype, "bill_value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Bill.prototype, "icon_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Bill.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Bill.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Bill.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Bill.prototype, "remark", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: now }),
    __metadata("design:type", String)
], Bill.prototype, "create_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: now }),
    __metadata("design:type", String)
], Bill.prototype, "modify_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], Bill.prototype, "status", void 0);
Bill = __decorate([
    (0, mongoose_1.Schema)()
], Bill);
exports.Bill = Bill;
exports.BillSchema = mongoose_1.SchemaFactory.createForClass(Bill);
//# sourceMappingURL=bill.schema.js.map