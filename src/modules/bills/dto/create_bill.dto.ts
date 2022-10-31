import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateBillDto {
  @ApiProperty({
    description: "分类名称",
    default: "分类名称"
  })
  @IsNotEmpty({ message: "分类名称不能为空" })
  @IsString({ message: "分类名称必须是字符串" })
  readonly name: string;

  @ApiProperty({
    description: "分类图标",
    default: "分类图标"
  })
  @IsNotEmpty({ message: "分类图标不能为空" })
  @IsString({ message: "分类图标必须是字符串" })
  readonly icon: string;

  @ApiProperty({
    description: "分类类型 1-收入 2-支出",
    default: "1"
  })
  @IsNotEmpty({ message: "分类类型不能为空" })
  @IsEnum(
    { 收入: 1, 支出: 2 },
    {
      message: "分类类型只能传入1或2"
    }
  )
  @Type(() => Number)
  readonly type: number;
}
