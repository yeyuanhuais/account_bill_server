"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongodb_setup_1 = require("./db/mongodb.setup");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./core/guards/jwt_auth.guard");
const classifies_module_1 = require("./modules/classifies/classifies.module");
const validation_pipe_1 = require("./core/pipes/validation.pipe");
const logging_interceptor_1 = require("./core/interceptor/logging.interceptor");
const bills_module_1 = require("./modules/bills/bills.module");
const assets_module_1 = require("./modules/assets/assets.module");
const config_setup_1 = require("./config/config.setup");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, config_setup_1.setupConfig)(),
            (0, mongodb_setup_1.setupMongodb)(),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            classifies_module_1.ClassifiesModule,
            bills_module_1.BillsModule,
            assets_module_1.AssetsModule
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard
            },
            {
                provide: core_1.APP_PIPE,
                useClass: validation_pipe_1.ValidationPipe
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map