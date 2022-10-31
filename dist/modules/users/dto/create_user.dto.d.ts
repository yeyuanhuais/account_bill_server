export declare class CreateUserDto {
    readonly account: string;
    readonly password: string;
    readonly rePassword: string;
    readonly phone?: string;
    readonly email?: string;
    readonly status?: number;
    readonly login_method: string;
    readonly salt?: string;
}
