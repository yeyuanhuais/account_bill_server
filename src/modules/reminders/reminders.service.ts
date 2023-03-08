import { CustomerException } from "@/core/exceptions/customer.exception";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { UserJwt } from "../auth/interface/user_jwt.interface";
import { CreateReminderDto } from "./dto/create_reminder.dto";
import { UpdateReminderDto } from "./dto/update_reminder.dto";
import { Reminder, ReminderDocument } from "./schemas/reminder.schema";

@Injectable()
export class RemindersService {
  constructor(@InjectModel("Reminders") private readonly reminderModel: Model<ReminderDocument>) {}

  async create(createReminderDto: CreateReminderDto, user: UserJwt): Promise<Reminder> {
    const reminder = await this.findOne({ user_id: user.id, name: createReminderDto.name });
    if (reminder) {
      throw new CustomerException(1, "该提醒已存在");
    }
    const createReminder = new this.reminderModel({ ...createReminderDto, user_id: user.id });
    return createReminder.save();
  }

  async findAll(query: object): Promise<Reminder[]> {
    const reminders = await this.reminderModel.find(query).exec();
    return reminders;
  }

  async findOneById(id: string): Promise<Reminder | null> {
    const reminder = await this.reminderModel.findById(id);
    return reminder;
  }
  async findOne(query: object): Promise<Reminder | null> {
    const reminder = await this.reminderModel.findOne(query);
    return reminder;
  }

  async update(id: string, updateReminderDto: UpdateReminderDto, user: UserJwt) {
    const { name, type } = updateReminderDto;
    const reminder = await this.findOne({ user_id: user.id, name });
    if (reminder) {
      throw new CustomerException(1, "该提醒名称已存在");
    }
    const modifyReminder = await this.reminderModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { name, type });
    return modifyReminder;
  }

  async remove(id: string) {
    const removeReminder = await this.reminderModel.findOneAndRemove({ _id: new mongoose.Types.ObjectId(id) });
    return removeReminder;
  }
}
