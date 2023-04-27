import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./core/filter/http_exception.filter";
import { TransformInterceptor } from "./core/interceptor/transform.interceptor";
import { Logger } from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require("body-parser");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("body-parser-xml")(bodyParser);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 请求统一请求头
  app.setGlobalPrefix("/v1");
  //允许跨域
  app.enableCors();
  // swagger
  const config = new DocumentBuilder()
    .addBearerAuth({ in: "header", type: "http", scheme: "bearer", bearerFormat: "JWT" }) // 开启 BearerAuth 授权认证
    .setTitle("接口文档")
    .setDescription("nest框架 接口")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(
    bodyParser.xml({
      xmlParseOptions: {
        explicitArray: false // 始终返回数组。默认情况下只有数组元素数量大于 1 是才返回数组。
      }
    })
  );

  await app.listen(3300, () => {
    Logger.log(`API文档已生成,请访问: http://localhost:3300/api`);
  });
}
bootstrap();
