import { PartialType } from "@nestjs/swagger";
import { CreateBillDto } from "./create_bill.dto";

export class UpdateBillDto extends PartialType(CreateBillDto) {}
