import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import dayjs from "dayjs";
const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
export type ReminderDocument = Reminder & Document;
@Schema()
export class Reminder {
  @Prop({ required: true })
  _id: Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop()
  value: string;
  @Prop({ default: 0 })
  status: number;
  @Prop()
  time: string;//每天的几点
  @Prop()
  date: string;//每月的几号或者每周的星期几
  @Prop()
  cycle: string;
  @Prop({ required: true })
  type: number;//1-默认的记账提醒  2-用户自定义添加的提醒
  @Prop()
  user_id: string;
  @Prop({ default: now })
  create_time: string;
  @Prop({ default: now })
  modify_time: string;
}
export const ReminderSchema = SchemaFactory.createForClass(Reminder);
