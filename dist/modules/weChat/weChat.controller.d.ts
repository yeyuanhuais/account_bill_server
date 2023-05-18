import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { WeChatService } from "./wechat.service";
interface UNSUPPORTED_MESSAGE_TYPES_ENUM {
    [key: string]: string;
}
export declare class WeChatController {
    private configService;
    private weChatService;
    constructor(configService: ConfigService, weChatService: WeChatService);
    UNSUPPORTED_MESSAGE_TYPES: UNSUPPORTED_MESSAGE_TYPES_ENUM;
    verify(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleMessage(body: any, res: Response): Promise<any>;
}
export {};
