import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
export declare class XMLMiddleware implements NestMiddleware {
    use(req: Request, next: NextFunction): Promise<void>;
}
