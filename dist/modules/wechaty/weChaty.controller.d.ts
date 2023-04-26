import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
export declare class WeChatyController {
    private configService;
    constructor(configService: ConfigService);
    verify(req: Request, res: Response): Promise<void>;
    handleMessage(req: Request, body: any, res: Response): Promise<any>;
}
