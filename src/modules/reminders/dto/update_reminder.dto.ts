import { PartialType } from "@nestjs/swagger";
import { CreateReminderDto } from "./create_Reminder.dto";

export class UpdateReminderDto extends PartialType(CreateReminderDto) {}
