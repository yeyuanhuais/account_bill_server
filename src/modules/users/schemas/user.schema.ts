import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import dayjs from "dayjs";
const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  account: string;
  @Prop()
  password: string;
  @Prop()
  phone: string;
  @Prop()
  last_ip: string;
  @Prop({ default: now })
  create_time: string;
  @Prop({ default: now })
  modify_time: string;
  @Prop()
  email: string;
  @Prop({ default: 1 })
  status: number;
  @Prop({ default: "web" })
  login_method: string;
  @Prop()
  salt: string;
  @Prop()
  openid: string;
  @Prop()
  session_key: string;
  @Prop()
  avatar_url: string;
  id: any;
}
export const UserSchema = SchemaFactory.createForClass(User);
