import { Module } from "@nestjs/common";
import { RemindersService } from "./reminders.service";
import { RemindersController } from "./reminders.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ReminderSchema } from "./schemas/reminder.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Reminders", schema: ReminderSchema }])],
  controllers: [RemindersController],
  providers: [RemindersService],
  exports: [RemindersService]
})
export class RemindersModule {}
