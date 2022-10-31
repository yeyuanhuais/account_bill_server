import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { CustomerException } from "@/core/exceptions/customer.exception";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ account: username, password });
    if (!user) {
      throw new CustomerException(3, "当前登录用户不存在");
    }
    return user;
  }
}
