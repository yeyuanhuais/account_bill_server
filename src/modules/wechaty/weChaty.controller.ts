import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { Public } from "src/core/decorators/public.decorator";
import * as xml2js from "xml2js";

@Controller("message")
export class WeChatyController {
  @Post("incoming")
  @Public()
  async handleMessage(@Req() req: Request, @Res() res: Response) {
    let xml = "";
    req.on("data", chunk => {
      xml += chunk;
    });

    req.on("end", () => {
      xml2js.parseString(xml, async (_err: any, result: { xml: any }) => {
        const message = result.xml;
        const content = message.Content[0];
        const fromUserName = message.FromUserName[0];
        const toUserName = message.ToUserName[0];
        const createTime = message.CreateTime[0];
        const replyContent = `你发送的消息是：${content}`;
        const replyMsg = `<xml>
                          <ToUserName><![CDATA[${fromUserName}]]></ToUserName>
                          <FromUserName><![CDATA[${toUserName}]]></FromUserName>
                          <CreateTime>${createTime}</CreateTime>
                          <MsgType><![CDATA[text]]></MsgType>
                          <Content><![CDATA[${replyContent}]]></Content>
                        </xml>`;
        res.send(replyMsg);
      });
    });
  }
}
