/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
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
    update(id: number, updateUserDto: UpdateUserDto): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    remove(id: number): Promise<string>;
    register(body: any): Promise<any>;
    wxRegister(body: WxCreateUserDto): Promise<any>;
    weixinLogin(code: string): Promise<any>;
}
