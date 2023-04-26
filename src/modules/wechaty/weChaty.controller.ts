import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Public } from "src/core/decorators/public.decorator";
import { Request, Response } from "express";
import * as crypto from "crypto";
import { ConfigService } from "@nestjs/config";
import { WeChatyService } from "./wechaty.service";

@Controller("wechaty")
export class WeChatyController {
  constructor(private readonly weChatyService: WeChatyService, private configService: ConfigService) {}

  @Get("incoming")
  @Public()
  async verify(@Req() req: Request, @Res() res: Response) {
    console.log("%c req", "font-size:13px; background:pink; color:#bf2c9f;", req);
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
  async handleMessage(@Body() body: any): Promise<any> {
    const xml = body.xml;
    console.log("%c xml", "font-size:13px; background:pink; color:#bf2c9f;", xml);
    const messageType = xml.MsgType[0];

    switch (messageType) {
      case "text":
        const content = xml.Content[0];
        const response = {
          xml: {
            ToUserName: xml.FromUserName[0],
            FromUserName: xml.ToUserName[0],
            CreateTime: new Date().getTime(),
            MsgType: "text",
            Content: `您发送的消息是：${content}`
          }
        };
        return response;
      default:
        return "";
    }
  }
}
