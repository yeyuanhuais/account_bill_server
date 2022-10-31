"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerException = void 0;
const common_1 = require("@nestjs/common");
class CustomerException extends common_1.HttpException {
    constructor(code, message) {
        super({ code, message }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.CustomerException = CustomerException;
//# sourceMappingURL=customer.exception.js.map