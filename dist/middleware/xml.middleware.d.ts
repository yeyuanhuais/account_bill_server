import { NestMiddleware } from "@nestjs/common";
import { Request } from "express";
export declare class XMLMiddleware implements NestMiddleware {
    use(req: Request, _res: any, next: () => void): void;
}
