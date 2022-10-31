import { CreateUserDto } from "./create_user.dto";
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    readonly account: string;
    readonly password: string;
    readonly phone: string;
    readonly email: string;
    readonly status: number;
}
export {};
