import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Public } from "src/core/decorators/public.decorator";
import { Request, Response } from "express";
import * as crypto from "crypto";
import { ConfigService } from "@nestjs/config";
import { WeChatyService } from "./wechaty.service";

@Controller("wechaty")
export class WeChatyController {
  constructor(private configService: ConfigService, private weChatyService: WeChatyService) {}

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
      res.send(echostr);
    } else {
      res.send("Failed");
    }
  }

  @Post("incoming")
  @Public()
  @HttpCode(HttpStatus.OK)
  async handleMessage(@Body() body: any, @Res() res: Response): Promise<any> {
    // 判断消息类型
    const { xml } = body;
    console.log("%c xml", "font-size:13px; background:pink; color:#bf2c9f;", xml);
    const msgType = xml.MsgType.toLowerCase();
    switch (msgType) {
      case "text":
        const response = this.weChatyService.generateTextReply(xml.ToUserName, xml.FromUserName, xml.Content);
        res.type("application/xml");
        res.send(response);
        break;
      case "event":
        switch (xml.Event) {
          case "unsubscribe": //取消关注
            break;
          case "subscribe": //关注
            const response = this.weChatyService.generateFocusOnReply(xml.ToUserName, xml.FromUserName);
            res.type("application/xml");
            res.send(response);
            break;
        }
        break;
      default:
        res.send("");
        break;
    }
  }
}
