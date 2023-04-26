import { Request, Response } from "express";
export declare class WeChatyController {
    verify(req: Request, res: Response): Promise<void>;
    handleMessage(): Promise<void>;
}
