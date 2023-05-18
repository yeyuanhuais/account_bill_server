import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Public } from "src/core/decorators/public.decorator";
import { Request, Response } from "express";
import * as crypto from "crypto";
import { ConfigService } from "@nestjs/config";
import { WeChatService } from "./weChat.service";
interface UNSUPPORTED_MESSAGE_TYPES_ENUM {
  [key: string]: string; // 字段扩展声明
}
@Controller("wechaty")
export class WeChatController {
  constructor(private configService: ConfigService, private weChatService: WeChatService) {}

  UNSUPPORTED_MESSAGE_TYPES: UNSUPPORTED_MESSAGE_TYPES_ENUM = {
    image: "暂不支持图片消息",
    voice: "暂不支持语音消息",
    video: "暂不支持视频消息",
    music: "暂不支持音乐消息",
    news: "暂不支持图文消息"
  };
  @Get("incoming")
  @Public()
  async verify(@Req() req: Request, @Res() res: Response) {
    const { signature, timestamp, nonce, echostr } = req.query;
    const token = this.configService.get<string>("WECHATY_PUPPET_PADPLUS_TOKEN");
    const list = [token, timestamp, nonce].sort();
    const str = list.join("").toString().replace(/,/g, "");
    const sha1 = crypto.createHash("sha1");
    sha1.update(str, "utf-8");
    const result = sha1.digest("hex");
    if (result === signature) {
      return res.send(echostr);
    } else {
      return res.send("Failed");
    }
  }

  @Post("incoming")
  @Public()
  @HttpCode(HttpStatus.OK)
  async handleMessage(@Body() body: any, @Res() res: Response): Promise<any> {
    // 判断消息类型
    const { xml } = body;
    const msgType: string = xml.MsgType.toLowerCase();

    // 验证是否为重复推送事件
    // const duplicatedEvent = await this.weChatService.checkEvent(xml);
    // if (duplicatedEvent) {
    //   return res.send("");
    // }
    switch (msgType) {
      case "text":
        const response =await this.weChatService.generateTextReply(xml);
        console.log("%c response", "font-size:13px; background:pink; color:#bf2c9f;", response);
        res.type("application/xml");
        return res.send(response);
        break;
      case "event":
        switch (xml.Event) {
          case "unsubscribe": //取消关注
            break;
          case "subscribe": //关注
            const response = this.weChatService.generateFocusOnReply(xml.ToUserName, xml.FromUserName);
            res.type("application/xml");
            return res.send(response);
            break;
          default:
            // return res.send("");
            break;
        }
        break;
      default:
        if (msgType in this.UNSUPPORTED_MESSAGE_TYPES) {
          const response = this.weChatService.toTextXML(xml.ToUserName, xml.FromUserName, this.UNSUPPORTED_MESSAGE_TYPES[msgType]);
          res.type("application/xml");
          return res.send(response);
        }
        break;
    }
  }
}
