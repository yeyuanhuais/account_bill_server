// src/logical/auth/auth.service.ts
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { encryptPassword } from "src/utils/cryptogram";
import { CustomerException } from "src/core/exceptions/customer.exception";
import { CertificateUser, ValidateUser } from "./interface/user_jwt.interface";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser({ account, password }: ValidateUser): Promise<any> {
    const user = await this.usersService.findOne({ account });
    if (user && Object.keys(user).length === 0) {
      throw new CustomerException(3, "该用户不存在");
    }
    const hashedPassword = user?.password;
    const salt = user?.salt;
    // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
    const hashPassword = encryptPassword(password, salt);
    if (hashedPassword === hashPassword) {
      // 密码正确
      return user;
    } else {
      throw new CustomerException(3, "账号或密码不正确");
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: CertificateUser) {
    const payload = {
      account: user?.account,
      id: (user._id || "").toString(),
      openid: user?.openid,
      session_key: user?.session_key
    };
    try {
      const token = this.jwtService.sign(payload);
      return { token, avatar_url: user.avatar_url, account: user.account };
    } catch (error) {
      throw new CustomerException(3, "token生成失败");
    }
  }
}
