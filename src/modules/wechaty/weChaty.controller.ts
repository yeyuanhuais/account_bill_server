import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Public } from "src/core/decorators/public.decorator";
// import { WeChatyService } from "./wechaty.service";
import { Request, Response } from "express";
import * as crypto from "crypto";

@Controller("wechaty")
export class WeChatyController {
  // constructor(private readonly weChatyService: WeChatyService) {}

  @Get("incoming")
  async verify(@Req() req: Request, @Res() res: Response) {
    console.log("%c req", "font-size:13px; background:pink; color:#bf2c9f;", req);
    const { signature, timestamp, nonce, echostr } = req.query;
    const token = "yeyuanhuais";
    const list = [token, timestamp, nonce].sort();
    const str = list.join("");
    const sha1 = crypto.createHash("sha1");
    sha1.update(str);
    const result = sha1.digest("hex");
    if (result === signature) {
      res.send(echostr);
    } else {
      res.send("Failed");
    }
  }
  @Post("incoming")
  @Public()
  async handleMessage() {}
}
