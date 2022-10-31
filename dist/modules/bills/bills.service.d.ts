import mongoose, { Model } from "mongoose";
import { UserJwt } from "../auth/interface/user_jwt.interface";
import { CreateBillDto } from "./dto/create_bill.dto";
import { UpdateBillDto } from "./dto/update_bill.dto";
import { Bill, BillDocument } from "./schemas/bill.schema";
export declare class BillsService {
    private readonly billModel;
    constructor(billModel: Model<BillDocument>);
    create(createBillDto: CreateBillDto, user: UserJwt): Promise<Bill>;
    findAll(query: object): Promise<Bill[]>;
    findOneById(id: string): Promise<Bill | null>;
    findOne(query: object): Promise<Bill | null>;
    update(id: string, updateBillDto: UpdateBillDto, user: UserJwt): Promise<(Bill & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
    remove(id: string): Promise<(Bill & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
}
