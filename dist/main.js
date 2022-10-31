"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./core/filter/http_exception.filter");
const transform_interceptor_1 = require("./core/interceptor/transform.interceptor");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("/v1");
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth({ in: "header", type: "http", scheme: "bearer", bearerFormat: "JWT" })
        .setTitle("接口文档")
        .setDescription("nest框架 接口")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    await app.listen(3100, () => {
        common_1.Logger.log(`API文档已生成,请访问: http://localhost:3100/api`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map