import { PartialType } from "@nestjs/swagger";
import { CreateAssetDto } from "./create_asset.dto";

export class UpdateAssetDto extends PartialType(CreateAssetDto) {}
