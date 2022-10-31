import { HttpException } from "@nestjs/common";
export declare class CustomerException extends HttpException {
    constructor(code: number, message: string);
}
