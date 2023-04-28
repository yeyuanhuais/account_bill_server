import { Injectable } from "@nestjs/common";
import { create } from "xmlbuilder2";

@Injectable()
export class WeChatyService {
  generateTextReply(toUser: string, fromUser: string, content: string): string {
    // 生成文本类型的回复消息
    const createTime = new Date().getTime();
    return create({
      xml: {
        ToUserName: fromUser,
        FromUserName: toUser,
        CreateTime: createTime,
        MsgType: "text",
        Content: `服务开发中，您发送的消息是：${content}`
      }
    }).end({ prettyPrint: true });
    return `<xml>
      <ToUserName><![CDATA[${fromUser}]]></ToUserName>
      <FromUserName><![CDATA[${toUser}]]></FromUserName>
      <CreateTime>${createTime}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[您发送的消息是：${content}]]></Content>
    </xml>`;
  }
}
