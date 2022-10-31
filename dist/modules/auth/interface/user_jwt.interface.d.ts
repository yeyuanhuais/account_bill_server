import mongoose from "mongoose";
export interface UserJwt {
    account: string;
    id: string;
    openid: string;
    session_key: string;
}
export interface CertificateUser {
    account?: string;
    _id?: mongoose.Types.ObjectId | undefined;
    openid?: string;
    session_key?: string;
    avatar_url?: string;
}
export interface ValidateUser {
    account: string;
    password: string;
}
