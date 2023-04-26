import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
export declare class XmlMiddleware implements NestMiddleware {
    use(req: Request, _res: Response, next: NextFunction): Promise<void>;
}
