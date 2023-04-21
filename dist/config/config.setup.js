"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupConfig = exports.envFilePath = void 0;
const config_1 = require("@nestjs/config");
exports.envFilePath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
console.log("%c process.env.NODE_ENV", "font-size:13px; background:pink; color:#bf2c9f;", process.env.NODE_ENV);
const setupConfig = () => {
    return config_1.ConfigModule.forRoot({ envFilePath: exports.envFilePath, isGlobal: true, cache: true });
};
exports.setupConfig = setupConfig;
//# sourceMappingURL=config.setup.js.map