/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from "mongoose";
import { ASSET_TYPE, SHOW, STATUS, TYPE } from "../enum";
export type AssetDocument = Asset & Document;
export declare class Asset {
    name: string;
    color: string;
    icon: string;
    money: number;
    asset_type: ASSET_TYPE;
    type: TYPE;
    user_id: string;
    create_time: string;
    modify_time: string;
    status: STATUS;
    show: SHOW;
}
export declare const AssetSchema: import("mongoose").Schema<Asset, import("mongoose").Model<Asset, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Asset>;
