import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create_user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly account: string;
  readonly password: string;
  readonly phone: string;
  readonly email: string;
  readonly status: number;
}
