"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMongodb = void 0;
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const setupMongodb = () => {
    return mongoose_1.MongooseModule.forRootAsync({
        imports: [config_1.ConfigModule],
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            const mongooseOptions = {
                uri: configService.get("MONGO_URI"),
                dbName: configService.get("MONGO_DB_NAME"),
                user: configService.get("MONGO_USER"),
                pass: configService.get("MONGO_PASS"),
                authSource: configService.get("MONGO_AUTH_SOURCE")
            };
            return mongooseOptions;
        }
    });
};
exports.setupMongodb = setupMongodb;
//# sourceMappingURL=mongodb.setup.js.map