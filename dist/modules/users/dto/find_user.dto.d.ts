export declare class FindUserDto {
    readonly account: string;
    readonly password: string;
    readonly phone?: string;
    readonly email?: string;
    readonly status?: number;
    create_time: string;
    modify_time: string;
    readonly salt?: string;
}
