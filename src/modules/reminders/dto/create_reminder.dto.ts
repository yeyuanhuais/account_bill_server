import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateReminderDto {
  @ApiProperty({
    description: "名称名称",
    default: "名称名称"
  })
  @IsNotEmpty({ message: "名称名称不能为空" })
  @IsString({ message: "名称名称必须是字符串" })
  readonly name: string;

  @ApiProperty({
    description: "状态",
    default: "状态"
  })
  @IsString({ message: "必须是字符串" })
  readonly status: number;

  @ApiProperty({
    description: "分类类型 1-系统提醒 2-用户自定义提醒",
    default: "1"
  })
  @IsNotEmpty({ message: "类型不能为空" })
  @IsEnum(
    { 系统提醒: 1, 用户自定义提醒: 2 },
    {
      message: "类型只能传入1或2"
    }
  )
  @Type(() => Number)
  readonly type: number;

  @ApiProperty({
    description: "时间",
    default: "00:00:00"
  })
  @Type(() => String)
  readonly time: string;

  @ApiProperty({
    description: "每月的几号或者每周的星期几",
    default: "1"
  })
  @Type(() => String)
  readonly date: string;

  @ApiProperty({
    description: "周期",
    default: "1"
  })
  @Type(() => String)
  readonly cycle: string;
}
