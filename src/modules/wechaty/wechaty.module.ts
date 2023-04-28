import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { WeChatyService } from "./wechaty.service";
import { WeChatyController } from "./weChaty.controller";
import { XMLMiddleware } from "@/middleware/xml.middleware";

@Module({
  providers: [WeChatyService],
  exports: [WeChatyService],
  controllers: [WeChatyController]
})
export class WechatyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XMLMiddleware).forRoutes("wechaty");
  }
}
