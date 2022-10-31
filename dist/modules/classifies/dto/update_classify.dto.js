"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClassifyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_classify_dto_1 = require("./create_classify.dto");
class UpdateClassifyDto extends (0, swagger_1.PartialType)(create_classify_dto_1.CreateClassifyDto) {
}
exports.UpdateClassifyDto = UpdateClassifyDto;
//# sourceMappingURL=update_classify.dto.js.map