import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Public } from "src/core/decorators/public.decorator";
import { Request, Response } from "express";
import * as crypto from "crypto";
import { ConfigService } from "@nestjs/config";
import { create } from "xmlbuilder2";

@Controller("wechaty")
export class WeChatyController {
  constructor(private configService: ConfigService) {}

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
  async handleMessage(@Req() req: Request, @Body("xml") body: any, @Res() res: Response): Promise<any> {
    // 判断消息类型
    const msgType = body.MsgType;
    switch (msgType) {
      case "text":
        const content = body.Content;
        const response = create({
          xml: {
            ToUserName: body.FromUserName,
            FromUserName: body.ToUserName,
            CreateTime: new Date().getTime(),
            MsgType: "text",
            Content: `您发送的消息是：${content}`
          }
        }).end({ prettyPrint: true });
        res.type("application/xml");
        res.send(response);
        break;
      default:
        res.send("");
        break;
    }
  }
}
