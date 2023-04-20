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
  create(@Body() messageDto: MessageDto) {
    const response = this.wechartGPTService.messageChatGPT(messageDto);
    return {
      ToUserName: messageDto.fromUserName,
      FromUserName: messageDto.toUserName,
      CreateTime: +new Date(),
      MsgType: "text",

      Content: response
    };
  }
}
