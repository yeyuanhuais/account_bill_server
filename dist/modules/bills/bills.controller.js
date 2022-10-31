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
exports.BillsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bills_service_1 = require("./bills.service");
const create_bill_dto_1 = require("./dto/create_bill.dto");
const update_bill_dto_1 = require("./dto/update_bill.dto");
let BillsController = class BillsController {
    constructor(billsService) {
        this.billsService = billsService;
    }
    async create(createBillDto, request) {
        await this.billsService.create(createBillDto, request.user);
        return;
    }
    findAll(query) {
        return this.billsService.findAll(query);
    }
    findOne(id) {
        return this.billsService.findOneById(id);
    }
    async update(id, updateBillDto, request) {
        await this.billsService.update(id, updateBillDto, request.user);
        return;
    }
    async remove(id) {
        await this.billsService.remove(id);
        return;
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiBody)({
        description: "创建分类",
        type: create_bill_dto_1.CreateBillDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "创建分类", description: "创建分类" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bill_dto_1.CreateBillDto, Object]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("findAll"),
    (0, swagger_1.ApiOperation)({ summary: "分类列表", description: "分类列表" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, swagger_1.ApiBody)({
        description: "编辑分类",
        type: update_bill_dto_1.UpdateBillDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "编辑分类", description: "编辑分类" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bill_dto_1.UpdateBillDto, Object]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("remove/:id"),
    (0, swagger_1.ApiOperation)({ summary: "删除分类", description: "删除分类" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "remove", null);
BillsController = __decorate([
    (0, common_1.Controller)("bills"),
    (0, swagger_1.ApiTags)("收入支出分类"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [bills_service_1.BillsService])
], BillsController);
exports.BillsController = BillsController;
//# sourceMappingURL=bills.controller.js.map