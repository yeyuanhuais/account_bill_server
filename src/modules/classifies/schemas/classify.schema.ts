import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import dayjs from "dayjs";
const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
export type ClassifyDocument = Classify & Document;
@Schema()
export class Classify {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  icon: string;
  @Prop({ required: true })
  type: number;
  @Prop()
  user_id: string;
  @Prop({ default: now })
  create_time: string;
  @Prop({ default: now })
  modify_time: string;
  @Prop({ default: 1 })
  status: number;
}
export const ClassifySchema = SchemaFactory.createForClass(Classify);
