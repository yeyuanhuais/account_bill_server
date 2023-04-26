import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Public } from "src/core/decorators/public.decorator";
import { Request, Response } from "express";
import * as crypto from "crypto";
import * as xml2js from "xml2js";
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
  async handleMessage(@Body() body: any, @Res() res: Response): Promise<any> {
    const xml = await xml2js.parseStringPromise(body);
    const message = xml.xml;

    // 判断消息类型
    const msgType = message.MsgType[0];
    switch (msgType) {
      case "text":
        const content = message.Content[0];
        const response = {
          xml: {
            ToUserName: message.FromUserName[0],
            FromUserName: message.ToUserName[0],
            CreateTime: new Date().getTime(),
            MsgType: "text",
            Content: `您发送的消息是：${content}`
          }
        };
        const xmlBuilder = new xml2js.Builder();
        const xmlResponse = xmlBuilder.buildObject(response);
        res.type("application/xml");
        res.send(xmlResponse);
        break;
      default:
        res.send("");
        break;
    }
  }
}
