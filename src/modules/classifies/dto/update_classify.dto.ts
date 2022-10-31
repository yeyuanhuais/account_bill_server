import { PartialType } from "@nestjs/swagger";
import { CreateClassifyDto } from "./create_classify.dto";

export class UpdateClassifyDto extends PartialType(CreateClassifyDto) {}
