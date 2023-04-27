import { Injectable } from "@nestjs/common";

@Injectable()
export class WeChatyService {
  generateTextReply(toUser: string, fromUser: string, content: string): string {
    // 生成文本类型的回复消息
    const createTime = new Date().getTime();
    return `<xml>
      <ToUserName><![CDATA[${fromUser}]]></ToUserName>
      <FromUserName><![CDATA[${toUser}]]></FromUserName>
      <CreateTime>${createTime}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[您发送的消息是：${content}]]></Content>
    </xml>`;
  }
}
