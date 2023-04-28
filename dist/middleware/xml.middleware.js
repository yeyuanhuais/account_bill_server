"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLMiddleware = void 0;
const common_1 = require("@nestjs/common");
const xml2js = __importStar(require("xml2js"));
const parseString = xml2js.parseString;
const parseXml = (xml) => {
    return new Promise((resolve, reject) => {
        parseString(xml, { explicitArray: false }, function (err, result) {
            if (!err) {
                resolve(result);
            }
            else {
                reject(err);
                throw err;
            }
        });
    });
};
let XMLMiddleware = class XMLMiddleware {
    use(req, _res, next) {
        if (req.method === "POST" && req.headers["content-type"] === "application/xml") {
            let xmlData = "";
            req.on("data", (chunk) => {
                xmlData += chunk;
            });
            req.on("end", () => {
                const parser = new xml2js.Parser({ explicitArray: false });
                parser.parseString(xmlData, (err, result) => {
                    if (err) {
                        console.log(err);
                        next();
                    }
                    else {
                        req.body = result;
                        next();
                    }
                });
            });
        }
        else {
            next();
        }
    }
};
XMLMiddleware = __decorate([
    (0, common_1.Injectable)()
], XMLMiddleware);
exports.XMLMiddleware = XMLMiddleware;
//# sourceMappingURL=xml.middleware.js.map