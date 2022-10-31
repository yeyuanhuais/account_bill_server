import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import dayjs from "dayjs";
const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
export type BillDocument = Bill & Document;
@Schema()
export class Bill {
  @Prop({ required: true })
  bill_value: string;
  @Prop({ required: true })
  icon_id: string;
  @Prop({ required: true })
  type: number;
  @Prop({ required: true })
  time: string;
  @Prop()
  user_id: string;
  @Prop()
  remark: string;
  @Prop({ default: now })
  create_time: string;
  @Prop({ default: now })
  modify_time: string;
  @Prop({ default: 1 })
  status: number;
}
export const BillSchema = SchemaFactory.createForClass(Bill);
