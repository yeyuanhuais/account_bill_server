import { ApiPropertyOptional } from "@nestjs/swagger";

export class WxCreateUserDto {
  @ApiPropertyOptional({
    description: "微信用户唯一标识",
    default: "1"
  })
  readonly openid?: string;

  @ApiPropertyOptional({
    description: "微信会话密钥",
    default: "1"
  })
  readonly session_key?: string;

  @ApiPropertyOptional({
    description: "微信昵称",
    default: "1"
  })
  readonly account?: string;

  @ApiPropertyOptional({
    description: "微信头像",
    default: "1"
  })
  readonly avatar_url?: string;
}
