import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {
  @ApiProperty({
    description: "用户名",
    default: "18160999831"
  })
  readonly fromUserName: string;
  @ApiProperty({
    description: "用户名",
    default: "18160999831"
  })
  readonly toUserName: string;

  @ApiProperty({
    description: "内容",
    default: "18160999831"
  })
  readonly content: string;
}
