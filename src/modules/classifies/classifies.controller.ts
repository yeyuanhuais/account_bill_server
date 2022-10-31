import { Controller, Get, Post, Body, Put, Param, Delete, Request, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ClassifiesService } from "./classifies.service";
import { CreateClassifyDto } from "./dto/create_classify.dto";
import { UpdateClassifyDto } from "./dto/update_classify.dto";

@Controller("classifies")
@ApiTags("收入支出分类")
@ApiBearerAuth()
export class ClassifiesController {
  constructor(private readonly classifiesService: ClassifiesService) {}

  @Post("create")
  @ApiBody({
    description: "创建分类",
    type: CreateClassifyDto
  })
  @ApiOperation({ summary: "创建分类", description: "创建分类" })
  async create(@Body() createClassifyDto: CreateClassifyDto, @Request() request: any) {
    await this.classifiesService.create(createClassifyDto, request.user);
    return;
  }

  @Get("findAll")
  @ApiOperation({ summary: "分类列表", description: "分类列表" })
  findAll(@Query() query: object) {
    return this.classifiesService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.classifiesService.findOneById(id);
  }

  @Put("update/:id")
  @ApiBody({
    description: "编辑分类",
    type: UpdateClassifyDto
  })
  @ApiOperation({ summary: "编辑分类", description: "编辑分类" })
  async update(@Param("id") id: string, @Body() updateClassifyDto: UpdateClassifyDto, @Request() request: any) {
    await this.classifiesService.update(id, updateClassifyDto, request.user);
    return;
  }

  @Delete("remove/:id")
  @ApiOperation({ summary: "删除分类", description: "删除分类" })
  async remove(@Param("id") id: string) {
    await this.classifiesService.remove(id);
    return;
  }
}
