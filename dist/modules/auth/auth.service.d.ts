import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CertificateUser, ValidateUser } from "./interface/user_jwt.interface";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser({ account, password }: ValidateUser): Promise<any>;
    certificate(user: CertificateUser): Promise<{
        token: string;
        avatar_url: string | undefined;
        account: string | undefined;
    }>;
}
