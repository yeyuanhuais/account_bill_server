import { Module } from "@nestjs/common";
import { ClassifiesService } from "./classifies.service";
import { ClassifiesController } from "./classifies.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassifySchema } from "./schemas/classify.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Classifies", schema: ClassifySchema }])],
  controllers: [ClassifiesController],
  providers: [ClassifiesService]
})
export class ClassifiesModule {}
