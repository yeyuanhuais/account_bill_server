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
        Content: `服务开发中，您发送的消息是：${content}
        本公众号不提供资源，推荐使用 阅读 app看小说
        GitHub地址：https://github.com/gedoor/legado
        蓝奏云地址：https://kunfei.lanzoui.com/b0f810h4b
        酷安：https://www.coolapk.com/apk/io.legado.app.release
        GitHub下载地址：https://github.com/gedoor/legado/releases
        阅读论坛地址：https://legado.cn/?fromuid=11272`
      }
    }).end({ prettyPrint: true });
    // return `<xml>
    //   <ToUserName><![CDATA[${fromUser}]]></ToUserName>
    //   <FromUserName><![CDATA[${toUser}]]></FromUserName>
    //   <CreateTime>${createTime}</CreateTime>
    //   <MsgType><![CDATA[text]]></MsgType>
    //   <Content><![CDATA[您发送的消息是：${content}]]></Content>
    // </xml>`;
  }
}
