import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomerException extends HttpException {
  constructor(code: number, message: string) {
    super({ code, message }, HttpStatus.BAD_REQUEST);
  }
}
