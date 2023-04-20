import mongoose, { Model } from "mongoose";
import { UserJwt } from "../auth/interface/user_jwt.interface";
import { CreateReminderDto } from "./dto/create_reminder.dto";
import { UpdateReminderDto } from "./dto/update_reminder.dto";
import { Reminder, ReminderDocument } from "./schemas/reminder.schema";
export declare class RemindersService {
    private readonly reminderModel;
    constructor(reminderModel: Model<ReminderDocument>);
    create(createReminderDto: CreateReminderDto, user: UserJwt): Promise<Reminder>;
    findAll(query: object): Promise<Reminder[]>;
    findOneById(id: string): Promise<Reminder | null>;
    findOne(query: object): Promise<Reminder | null>;
    update(id: string, updateReminderDto: UpdateReminderDto, user: UserJwt): Promise<(Reminder & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
    remove(id: string): Promise<(Reminder & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
}
