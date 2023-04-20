import { RemindersService } from "./reminders.service";
import { CreateReminderDto } from "./dto/create_reminder.dto";
import { UpdateReminderDto } from "./dto/update_reminder.dto";
export declare class RemindersController {
    private readonly remindersService;
    constructor(remindersService: RemindersService);
    create(createReminderDto: CreateReminderDto, request: any): Promise<void>;
    findAll(query: object): Promise<import("./schemas/reminder.schema").Reminder[]>;
    findOne(id: string): Promise<import("./schemas/reminder.schema").Reminder | null>;
    update(id: string, updateReminderDto: UpdateReminderDto, request: any): Promise<void>;
    remove(id: string): Promise<void>;
}
