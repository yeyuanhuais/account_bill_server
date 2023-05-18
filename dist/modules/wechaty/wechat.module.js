"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeChatModule = void 0;
const common_1 = require("@nestjs/common");
const wechat_service_1 = require("./wechat.service");
const weChat_controller_1 = require("./weChat.controller");
const xml_middleware_1 = require("../../middleware/xml.middleware");
const mongoose_1 = require("@nestjs/mongoose");
const weChatMessage_schema_1 = require("./schemas/weChatMessage.schema");
let WeChatModule = class WeChatModule {
    configure(consumer) {
        consumer.apply(xml_middleware_1.XMLMiddleware).forRoutes("wechaty");
    }
};
WeChatModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "WeChatMessages", schema: weChatMessage_schema_1.WeChatMessageSchema }])],
        providers: [wechat_service_1.WeChatService],
        exports: [wechat_service_1.WeChatService],
        controllers: [weChat_controller_1.WeChatController]
    })
], WeChatModule);
exports.WeChatModule = WeChatModule;
//# sourceMappingURL=wechat.module.js.map