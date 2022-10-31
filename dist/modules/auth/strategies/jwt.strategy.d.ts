import { Strategy } from "passport-jwt";
import { UserJwt } from "../interface/user_jwt.interface";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserJwt): Promise<UserJwt>;
}
export {};
