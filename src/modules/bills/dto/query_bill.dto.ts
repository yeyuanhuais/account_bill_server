import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class QueryBillDto {
  @ApiProperty({
    description: "pageSize",
    default: "10"
  })
  @IsString({ message: "pageSize必须是字符串" })
  readonly pageSize?: number;

  @ApiProperty({
    description: "页数",
    default: "1"
  })
  @IsString({ message: "页数必须是字符串" })
  readonly pageNum?: number;
}
