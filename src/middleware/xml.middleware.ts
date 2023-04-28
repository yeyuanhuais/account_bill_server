import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from "express";
import * as xml2js from "xml2js";

const parseString = xml2js.parseString;

const parseXml = (xml: string): any => {
  return new Promise((resolve, reject) => {
    parseString(xml, { explicitArray: false }, function (err, result) {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
        throw err;
      }
    });
  });
};

@Injectable()
export class XMLMiddleware implements NestMiddleware {
  use(req: Request, _res: any, next: () => void) {
    console.log("%c req", "font-size:13px; background:pink; color:#bf2c9f;", req);
    const buffer: any[] = [];
    req.on("data", data => {
      buffer.push(data);
    });
    req.on("end", async () => {
      console.log(req.query);
      const msgXml = Buffer.concat(buffer).toString("utf-8");
      const xmlData = await parseXml(msgXml);
      req.body = xmlData;
      next();
    });
  }
}
