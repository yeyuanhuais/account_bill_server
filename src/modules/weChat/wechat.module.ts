import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { WeChatService } from "./wechat.service";
import { WeChatController } from "./weChat.controller";
import { XMLMiddleware } from "@/middleware/xml.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import { WeChatMessageSchema } from "./schemas/weChatMessage.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "WeChatMessages", schema: WeChatMessageSchema }])],
  providers: [WeChatService],
  exports: [WeChatService],
  controllers: [WeChatController]
})
export class WeChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XMLMiddleware).forRoutes("wechaty");
  }
}
