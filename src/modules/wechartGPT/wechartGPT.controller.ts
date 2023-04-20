import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "src/core/decorators/public.decorator";
import { WechartGPTService } from "./wechartGPT.service";
import { MessageDto } from "./dto/message";
@Controller("wechartGPT")
@ApiTags("微信公众号GPT聊天")
export class WechartGPTController {
  constructor(private readonly wechartGPTService: WechartGPTService) {}

  @Post("message")
  @Public()
  @ApiBody({
    description: "消息",
    type: MessageDto
  })
  @ApiOperation({ summary: "消息", description: "消息" })
  async create(@Body() messageDto: MessageDto) {
    const response = await this.wechartGPTService.messageChatGPT(messageDto);
    console.log("%c response", "font-size:13px; background:pink; color:#bf2c9f;", response);
    return {
      ToUserName: messageDto.fromUserName,
      FromUserName: messageDto.toUserName,
      CreateTime: +new Date(),
      MsgType: "text",

      Content: response
    };
  }
}
