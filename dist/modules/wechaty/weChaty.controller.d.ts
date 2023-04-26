import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { WeChatyService } from "./wechaty.service";
export declare class WeChatyController {
    private readonly weChatyService;
    private configService;
    constructor(weChatyService: WeChatyService, configService: ConfigService);
    verify(req: Request, res: Response): Promise<void>;
    handleMessage(body: any): Promise<any>;
}
