"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupConfig = exports.envFilePath = void 0;
const config_1 = require("@nestjs/config");
exports.envFilePath = ".env";
const setupConfig = () => {
    return config_1.ConfigModule.forRoot({ envFilePath: exports.envFilePath, isGlobal: true, cache: true });
};
exports.setupConfig = setupConfig;
//# sourceMappingURL=config.setup.js.map