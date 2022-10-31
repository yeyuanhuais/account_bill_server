import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class QueryUserDto {
  @ApiProperty({
    description: "pageSize",
    default: "10"
  })
  @IsNotEmpty({ message: "pageSize不能为空" })
  @IsString({ message: "pageSize必须是字符串" })
  readonly pageSize: number;

  @ApiProperty({
    description: "页数",
    default: "1"
  })
  @IsNotEmpty({ message: "页数不能为空" })
  @IsString({ message: "页数必须是字符串" })
  readonly pageNum: number;
}
