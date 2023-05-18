import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { WeChatMessageService } from "./weChatMessage.service";
import { WeChatMessageController } from "./weChatMessage.controller";
import { XMLMiddleware } from "@/middleware/xml.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import { WeChatMessageSchema } from "./schemas/weChatMessage.schema";
// 
@Module({
  imports: [MongooseModule.forFeature([{ name: "WeChatMessages", schema: WeChatMessageSchema }])],
  providers: [WeChatMessageService],
  exports: [WeChatMessageService],
  controllers: [WeChatMessageController]
})
export class WeChatMessageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XMLMiddleware).forRoutes("wechaty");
  }
}
