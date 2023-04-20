import { PartialType } from "@nestjs/swagger";
import { CreateReminderDto } from "./create_reminder.dto";

export class UpdateReminderDto extends PartialType(CreateReminderDto) {}
