import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/create_user.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { ConfigService } from "@nestjs/config";
import { WxCreateUserDto } from "./dto/wx_create_user.dto";
export declare class UsersService {
    private readonly usersModel;
    private configService;
    constructor(usersModel: Model<UserDocument>, configService: ConfigService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(query: {
        pageSize: number;
        pageNum: number;
    }): Promise<User[]>;
    findOneById(id: number): Promise<User | null>;
    findOne(query: object): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<(User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
    remove(id: number): Promise<string>;
    register(body: any): Promise<any>;
    wxRegister(body: WxCreateUserDto): Promise<any>;
    weixinLogin(code: string): Promise<any>;
}
