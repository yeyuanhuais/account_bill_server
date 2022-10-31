"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMongodb = void 0;
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const setupMongodb = () => {
    return mongoose_1.MongooseModule.forRootAsync({
        imports: [config_1.ConfigModule],
        useFactory: () => {
            const mongooseOptions = {
                uri: "mongodb://yyh:mongodb@yyh28.top:27017",
                dbName: "bill"
            };
            return mongooseOptions;
        },
        inject: [config_1.ConfigService]
    });
};
exports.setupMongodb = setupMongodb;
//# sourceMappingURL=mongodb.setup.js.map