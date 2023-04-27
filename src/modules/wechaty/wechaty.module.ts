import { Module } from "@nestjs/common";
import { WeChatyService } from "./wechaty.service";
import { WeChatyController } from "./weChaty.controller";

@Module({
  providers: [WeChatyService],
  exports: [WeChatyService],
  controllers: [WeChatyController]
})
export class WechatyModule {}
