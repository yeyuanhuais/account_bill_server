"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlMiddleware = void 0;
const common_1 = require("@nestjs/common");
const xml2js_1 = require("xml2js");
let XmlMiddleware = class XmlMiddleware {
    async use(req, _res, next) {
        const buffer = [];
        console.log("%c buffer", "font-size:13px; background:pink; color:#bf2c9f;", buffer, req.headers["content-type"]);
        req.on("data", chunk => {
            buffer.push(chunk);
        });
        req.on("end", () => {
            const msgXml = Buffer.concat(buffer).toString("utf-8");
            (0, xml2js_1.parseString)(msgXml, (err, result) => {
                if (err) {
                    throw err;
                }
                req.body = result;
                next();
            });
        });
    }
};
XmlMiddleware = __decorate([
    (0, common_1.Injectable)()
], XmlMiddleware);
exports.XmlMiddleware = XmlMiddleware;
//# sourceMappingURL=xml.middleware.js.map