import { CustomerException } from "@/core/exceptions/customer.exception";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { UserJwt } from "../auth/interface/user_jwt.interface";
import { CreateClassifyDto } from "./dto/create_classify.dto";
import { UpdateClassifyDto } from "./dto/update_classify.dto";
import { Classify, ClassifyDocument } from "./schemas/classify.schema";

@Injectable()
export class ClassifiesService {
  constructor(@InjectModel("Classifies") private readonly classifyModel: Model<ClassifyDocument>) {}

  async create(createClassifyDto: CreateClassifyDto, user: UserJwt): Promise<Classify> {
    const classify = await this.findOne({ user_id: user.id, name: createClassifyDto.name });
    if (classify) {
      throw new CustomerException(1, "该分类已存在");
    }
    const createClassify = new this.classifyModel({ ...createClassifyDto, user_id: user.id });
    return createClassify.save();
  }

  async findAll(query: object): Promise<Classify[]> {
    const classifies = await this.classifyModel.find(query).exec();
    return classifies;
  }

  async findOneById(id: string): Promise<Classify | null> {
    const classify = await this.classifyModel.findById(id);
    return classify;
  }
  async findOne(query: object): Promise<Classify | null> {
    const classify = await this.classifyModel.findOne(query);
    return classify;
  }

  async update(id: string, updateClassifyDto: UpdateClassifyDto, user: UserJwt) {
    const { name, type, icon } = updateClassifyDto;
    const classify = await this.findOne({ user_id: user.id, name });
    if (classify) {
      throw new CustomerException(1, "该分类名称已存在");
    }
    const modifyClassify = await this.classifyModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { name, type, icon });
    return modifyClassify;
  }

  async remove(id: string) {
    const removeClassify = await this.classifyModel.findOneAndRemove({ _id: new mongoose.Types.ObjectId(id) });
    return removeClassify;
  }
}
