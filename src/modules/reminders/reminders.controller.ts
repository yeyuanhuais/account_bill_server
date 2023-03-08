import { Controller, Get, Post, Body, Put, Param, Delete, Request, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RemindersService } from "./reminders.service";
import { CreateReminderDto } from "./dto/create_reminder.dto";
import { UpdateReminderDto } from "./dto/update_reminder.dto";

@Controller("reminders")
@ApiTags("设置提醒")
@ApiBearerAuth()
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post("create")
  @ApiBody({
    description: "创建提醒",
    type: CreateReminderDto
  })
  @ApiOperation({ summary: "创建提醒", description: "创建提醒" })
  async create(@Body() createReminderDto: CreateReminderDto, @Request() request: any) {
    await this.remindersService.create(createReminderDto, request.user);
    return;
  }

  @Get("findAll")
  @ApiOperation({ summary: "提醒列表", description: "提醒列表" })
  findAll(@Query() query: object) {
    return this.remindersService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.remindersService.findOneById(id);
  }

  @Put("update/:id")
  @ApiBody({
    description: "编辑提醒",
    type: UpdateReminderDto
  })
  @ApiOperation({ summary: "编辑提醒", description: "编辑提醒" })
  async update(@Param("id") id: string, @Body() updateReminderDto: UpdateReminderDto, @Request() request: any) {
    await this.remindersService.update(id, updateReminderDto, request.user);
    return;
  }

  @Delete("remove/:id")
  @ApiOperation({ summary: "删除提醒", description: "删除提醒" })
  async remove(@Param("id") id: string) {
    await this.remindersService.remove(id);
    return;
  }
}
