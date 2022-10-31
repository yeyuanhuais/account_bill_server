import { Controller, Get, Post, Body, Put, Param, Delete, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AssetsService } from "./assets.service";
import { CreateAssetDto } from "./dto/create_asset.dto";
import { UpdateAssetDto } from "./dto/update_asset.dto";

@Controller("assets")
@ApiTags("资产")
@ApiBearerAuth()
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post("create")
  @ApiBody({
    description: "创建资产",
    type: CreateAssetDto
  })
  @ApiOperation({ summary: "创建资产", description: "创建资产" })
  async create(@Body() createAssetDto: CreateAssetDto, @Request() request: any) {
    await this.assetsService.create(createAssetDto, request.user);
    return;
  }

  @Get("findAll")
  @ApiOperation({ summary: "资产列表", description: "资产列表" })
  async findAll(@Request() request: any) {
    const assets = await this.assetsService.findAll({ asset_type: 1, user_id: request.id });
    const assets_money = assets.reduce((pre, cur) => cur.money + pre, 0);
    const liabilities = await this.assetsService.findAll({ asset_type: 2, user_id: request.id });
    const liabilities_money = assets.reduce((pre, cur) => cur.money + pre, 0);
    const netAssets = assets_money - liabilities_money;
    return [
      { title: "资产", assets: assets_money, netAssets, childData: assets },
      {
        title: "负债",
        assets: liabilities_money,
        childData: liabilities
      }
    ];
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.assetsService.findOneById(id);
  }

  @Put("update/:id")
  @ApiBody({
    description: "编辑资产",
    type: UpdateAssetDto
  })
  @ApiOperation({ summary: "编辑资产", description: "编辑资产" })
  async update(@Param("id") id: string, @Body() updateAssetDto: UpdateAssetDto, @Request() request: any) {
    await this.assetsService.update(id, updateAssetDto, request.user);
    return;
  }

  @Delete("remove/:id")
  @ApiOperation({ summary: "删除资产", description: "删除资产" })
  async remove(@Param("id") id: string) {
    await this.assetsService.remove(id);
    return;
  }
}
