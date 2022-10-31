// src/logical/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "../consts/constants";
import { UserJwt } from "../interface/user_jwt.interface";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 前端请求头header 就要有这个字段Authorization:`Bearer ${token}`
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: UserJwt) {
    return payload;
  }
}
