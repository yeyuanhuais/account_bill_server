import mongoose, { Model } from "mongoose";
import { UserJwt } from "../auth/interface/user_jwt.interface";
import { CreateAssetDto } from "./dto/create_asset.dto";
import { UpdateAssetDto } from "./dto/update_asset.dto";
import { Asset, AssetDocument } from "./schemas/asset.schema";
export declare class AssetsService {
    private readonly assetModel;
    constructor(assetModel: Model<AssetDocument>);
    create(createAssetDto: CreateAssetDto, user: UserJwt): Promise<Asset>;
    findAll(query: object): Promise<Asset[]>;
    findOneById(id: string): Promise<Asset | null>;
    findOne(query: object): Promise<Asset | null>;
    update(id: string, updateAssetDto: UpdateAssetDto, user: UserJwt): Promise<(Asset & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
    remove(id: string): Promise<(Asset & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
}
