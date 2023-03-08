import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "./dto/create_user.dto";
import { LoginUserDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { WxLoginUserDto } from "./dto/wx_login.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    findAll(query: any): Promise<import("./schemas/user.schema").User[]>;
    findOne(id: string): Promise<import("./schemas/user.schema").User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<(import("./schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    remove(id: string): Promise<string>;
    register(createUserDto: CreateUserDto): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        avatar_url: string | undefined;
        account: string | undefined;
    }>;
    wxLogin(wxLoginUserDto: WxLoginUserDto): Promise<{
        token: string;
        avatar_url: string | undefined;
        account: string | undefined;
    }>;
}
