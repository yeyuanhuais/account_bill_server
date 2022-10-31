import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ASSET_TYPE, SHOW, STATUS, TYPE } from "../enum";
import dayjs from "dayjs";
const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
export type AssetDocument = Asset & Document;
@Schema()
export class Asset {
  @Prop({ required: true })
  name: string;
  @Prop()
  color: string;
  @Prop()
  icon: string;
  @Prop({ default: 0 })
  money: number;
  @Prop({ type: Number, required: true, enum: ASSET_TYPE })
  asset_type: ASSET_TYPE;
  @Prop({ type: Number, required: true, enum: TYPE })
  type: TYPE;
  @Prop()
  user_id: string;
  @Prop({ default: now })
  create_time: string;
  @Prop({ default: now })
  modify_time: string;
  @Prop({ type: Number, default: 1, enum: STATUS })
  status: STATUS;
  @Prop({ type: Number, default: 1, enum: SHOW })
  show: SHOW;
}
export const AssetSchema = SchemaFactory.createForClass(Asset);
