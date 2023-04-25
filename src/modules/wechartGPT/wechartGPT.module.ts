import { Module } from "@nestjs/common";
import { WechartGPTService } from "./wechartGPT.service";
import { WechartGPTController } from "./wechartGPT.controller";
import { WechatyModule } from "../wechaty/wechaty.module";

@Module({
  imports: [WechatyModule],
  controllers: [WechartGPTController],
  providers: [WechartGPTService]
})
export class WechartGPTModule {}
