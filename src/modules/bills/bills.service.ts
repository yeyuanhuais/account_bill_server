import { CustomerException } from "@/core/exceptions/customer.exception";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { UserJwt } from "../auth/interface/user_jwt.interface";
import { CreateBillDto } from "./dto/create_bill.dto";
import { UpdateBillDto } from "./dto/update_bill.dto";
import { Bill, BillDocument } from "./schemas/bill.schema";

@Injectable()
export class BillsService {
  constructor(@InjectModel("Bills") private readonly billModel: Model<BillDocument>) {}

  async create(createBillDto: CreateBillDto, user: UserJwt): Promise<Bill> {
    const bill = await this.findOne({ user_id: user.id, name: createBillDto.name });
    if (bill) {
      throw new CustomerException(1, "该分类已存在");
    }
    const createBill = new this.billModel({ ...createBillDto, user_id: user.id });
    return createBill.save();
  }

  async findAll(query: object): Promise<Bill[]> {
    const classifies = await this.billModel.find(query).exec();
    return classifies;
  }

  async findOneById(id: string): Promise<Bill | null> {
    const bill = await this.billModel.findById(id);
    return bill;
  }
  async findOne(query: object): Promise<Bill | null> {
    const bill = await this.billModel.findOne(query);
    return bill;
  }

  async update(id: string, updateBillDto: UpdateBillDto, user: UserJwt) {
    const { name, type, icon } = updateBillDto;
    const bill = await this.findOne({ user_id: user.id, name });
    if (bill) {
      throw new CustomerException(1, "该分类名称已存在");
    }
    const modifyBill = await this.billModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { name, type, icon });
    return modifyBill;
  }

  async remove(id: string) {
    const removeBill = await this.billModel.findOneAndRemove({ _id: new mongoose.Types.ObjectId(id) });
    return removeBill;
  }
}
