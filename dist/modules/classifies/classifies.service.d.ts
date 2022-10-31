import mongoose, { Model } from "mongoose";
import { UserJwt } from "../auth/interface/user_jwt.interface";
import { CreateClassifyDto } from "./dto/create_classify.dto";
import { UpdateClassifyDto } from "./dto/update_classify.dto";
import { Classify, ClassifyDocument } from "./schemas/classify.schema";
export declare class ClassifiesService {
    private readonly classifyModel;
    constructor(classifyModel: Model<ClassifyDocument>);
    create(createClassifyDto: CreateClassifyDto, user: UserJwt): Promise<Classify>;
    findAll(query: object): Promise<Classify[]>;
    findOneById(id: string): Promise<Classify | null>;
    findOne(query: object): Promise<Classify | null>;
    update(id: string, updateClassifyDto: UpdateClassifyDto, user: UserJwt): Promise<(Classify & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
    remove(id: string): Promise<(Classify & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
}
