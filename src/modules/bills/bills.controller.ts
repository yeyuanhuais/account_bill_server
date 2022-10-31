import { Controller, Get, Post, Body, Put, Param, Delete, Request, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BillsService } from "./bills.service";
import { CreateBillDto } from "./dto/create_bill.dto";
import { UpdateBillDto } from "./dto/update_bill.dto";

@Controller("bills")
@ApiTags("收入支出分类")
@ApiBearerAuth()
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post("create")
  @ApiBody({
    description: "创建分类",
    type: CreateBillDto
  })
  @ApiOperation({ summary: "创建分类", description: "创建分类" })
  async create(@Body() createBillDto: CreateBillDto, @Request() request: any) {
    await this.billsService.create(createBillDto, request.user);
    return;
  }

  @Get("findAll")
  @ApiOperation({ summary: "分类列表", description: "分类列表" })
  findAll(@Query() query: object) {
    return this.billsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.billsService.findOneById(id);
  }

  @Put("update/:id")
  @ApiBody({
    description: "编辑分类",
    type: UpdateBillDto
  })
  @ApiOperation({ summary: "编辑分类", description: "编辑分类" })
  async update(@Param("id") id: string, @Body() updateBillDto: UpdateBillDto, @Request() request: any) {
    await this.billsService.update(id, updateBillDto, request.user);
    return;
  }

  @Delete("remove/:id")
  @ApiOperation({ summary: "删除分类", description: "删除分类" })
  async remove(@Param("id") id: string) {
    await this.billsService.remove(id);
    return;
  }
}
