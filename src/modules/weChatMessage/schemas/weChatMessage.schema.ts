import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import dayjs from "dayjs";
const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
export type WeChatMessageDocument = WeChatMessage & Document;
@Schema()
export class WeChatMessage {
  @Prop()
  fromUser: string;
  @Prop()
  eventId: string;
  @Prop()
  content: string;
  @Prop()
  answer: string;
  @Prop()
  token: string;
  @Prop()
  createTime: string;
}
export const WeChatMessageSchema = SchemaFactory.createForClass(WeChatMessage);
