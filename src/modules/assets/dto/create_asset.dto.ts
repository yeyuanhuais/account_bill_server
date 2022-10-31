import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ASSET_TYPE, SHOW, TYPE } from "../enum";

export class CreateAssetDto {
  @ApiProperty({
    description: "资产名称",
    default: "资产名称"
  })
  @IsNotEmpty({ message: "资产名称不能为空" })
  @IsString({ message: "资产名称必须是字符串" })
  readonly name: string;

  @ApiProperty({
    description: "资产颜色",
    default: "资产颜色"
  })
  @IsString({ message: "资产颜色必须是字符串" })
  readonly color: string;

  @ApiProperty({
    description: "资产图标",
    default: "资产图标"
  })
  @IsString({ message: "资产图标必须是字符串" })
  readonly icon: string;

  @ApiProperty({
    description: "资产",
    default: "资产"
  })
  @IsString({ message: "资产必须是字符串" })
  readonly money: number;

  @ApiProperty({
    description: "资产类型 资产 = 1,负债 = 2",
    default: "1"
  })
  @IsNotEmpty({ message: "资产类型不能为空" })
  @IsEnum(ASSET_TYPE, {
    message: "资产类型只能传入1或2"
  })
  @Type(() => Number)
  readonly asset_type: number;

  @ApiProperty({
    description: "账户类型 ",
    default: "1"
  })
  @IsNotEmpty({ message: "账户类型不能为空" })
  @IsEnum(TYPE, {
    message: "账户类型只能传入1或2"
  })
  @Type(() => Number)
  readonly type: number;

  @ApiProperty({
    description: "展示状态 1-收入 2-支出",
    default: "1"
  })
  @IsNotEmpty({ message: "展示状态不能为空" })
  @IsEnum(SHOW, {
    message: "展示状态只能传入1或2"
  })
  @Type(() => Number)
  readonly show: number;
}
