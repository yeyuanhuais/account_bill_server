import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { WeChatyService } from "./wechaty.service";
export declare class WeChatyController {
    private configService;
    private weChatyService;
    constructor(configService: ConfigService, weChatyService: WeChatyService);
    verify(req: Request, res: Response): Promise<void>;
    handleMessage(body: any, res: Response): Promise<any>;
}
