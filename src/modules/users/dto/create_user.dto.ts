import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "账号",
    default: "18160999831"
  })
  @IsNotEmpty({ message: "账号不能为空" })
  @IsString({ message: "账号必须是字符串" })
  readonly account: string;

  @ApiProperty({
    description: "密码",
    default: "18160999831"
  })
  @IsNotEmpty({ message: "密码不能为空" })
  @IsString({ message: "密码必须是字符串" })
  readonly password: string;

  @ApiProperty({
    description: "确认密码",
    default: "18160999831"
  })
  @IsNotEmpty({ message: "确认密码不能为空" })
  @IsString({ message: "确认密码必须是字符串" })
  readonly rePassword: string;

  @ApiPropertyOptional({
    description: "手机号",
    default: "18160999831"
  })
  @IsMobilePhone("zh-CN", {}, { message: "手机号码格式错误" })
  @IsString({ message: "手机号必须是字符串" })
  @IsOptional()
  readonly phone?: string;

  @ApiPropertyOptional({
    description: "邮件",
    default: "18160999831@qq.com"
  })
  @IsEmail({}, { message: "邮箱格式错误" })
  @IsString({ message: "邮件必须是字符串" })
  @IsOptional()
  readonly email?: string;

  @ApiPropertyOptional({
    description: "状态 0-停用 1-正常",
    default: "1"
  })
  @IsOptional()
  @IsEnum(
    { 禁用: 0, 正常: 1 },
    {
      message: "状态只能传入0或1"
    }
  )
  @Type(() => Number)
  readonly status?: number = 1;

  @ApiPropertyOptional({
    description: "登录方式",
    default: "1"
  })
  @IsString({ message: "登录方式必须是字符串" })
  readonly login_method: string;

  @ApiPropertyOptional({
    description: "密码盐",
    default: "1"
  })
  readonly salt?: string;
}
