import { CustomerException } from "@/core/exceptions/customer.exception";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { UserJwt } from "../auth/interface/user_jwt.interface";
import { CreateAssetDto } from "./dto/create_asset.dto";
import { UpdateAssetDto } from "./dto/update_asset.dto";
import { Asset, AssetDocument } from "./schemas/asset.schema";

@Injectable()
export class AssetsService {
  constructor(@InjectModel("Assets") private readonly assetModel: Model<AssetDocument>) {}

  async create(createAssetDto: CreateAssetDto, user: UserJwt): Promise<Asset> {
    const asset = await this.findOne({ user_id: user.id, name: createAssetDto.name });
    if (asset) {
      throw new CustomerException(1, "该账户已存在");
    }
    const createAsset = new this.assetModel({ ...createAssetDto, user_id: user.id });
    return createAsset.save();
  }

  async findAll(query: object): Promise<Asset[]> {
    const assets = await this.assetModel.find(query).exec();
    return assets;
  }

  async findOneById(id: string): Promise<Asset | null> {
    const asset = await this.assetModel.findById(id);
    return asset;
  }
  async findOne(query: object): Promise<Asset | null> {
    const asset = await this.assetModel.findOne(query);
    return asset;
  }

  async update(id: string, updateAssetDto: UpdateAssetDto, user: UserJwt) {
    const { name, type, icon } = updateAssetDto;
    const asset = await this.findOne({ user_id: user.id, name });
    if (asset) {
      throw new CustomerException(1, "该账户名称已存在");
    }
    const modifyAsset = await this.assetModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { name, type, icon });
    return modifyAsset;
  }

  async remove(id: string) {
    const removeAsset = await this.assetModel.findOneAndRemove({ _id: new mongoose.Types.ObjectId(id) });
    return removeAsset;
  }
}
