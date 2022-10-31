import { Module } from "@nestjs/common";
import { AssetsService } from "./assets.service";
import { AssetsController } from "./assets.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AssetSchema } from "./schemas/asset.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Assets", schema: AssetSchema }])],
  controllers: [AssetsController],
  providers: [AssetsService]
})
export class AssetsModule {}
