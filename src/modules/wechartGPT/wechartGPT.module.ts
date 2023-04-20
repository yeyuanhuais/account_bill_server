import { Module } from "@nestjs/common";
import { WechartGPTService } from "./wechartGPT.service";
import { WechartGPTController } from "./wechartGPT.controller";

@Module({
  imports: [],
  controllers: [WechartGPTController],
  providers: [WechartGPTService],
  exports: [WechartGPTService]
})
export class WechartGPTModule {}
