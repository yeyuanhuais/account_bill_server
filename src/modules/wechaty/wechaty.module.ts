import { MiddlewareConsumer, Module } from "@nestjs/common";
import { WeChatyService } from "./wechaty.service";
import { WeChatyController } from "./weChaty.controller";
import { XmlMiddleware } from "@/core/middleware/xml.middleware";

@Module({
  providers: [WeChatyService],
  exports: [WeChatyService],
  controllers: [WeChatyController]
})
export class WechatyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XmlMiddleware).forRoutes("/v1/wechaty");
  }
}
