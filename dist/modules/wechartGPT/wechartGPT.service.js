"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechartGPTService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let WechartGPTService = class WechartGPTService {
    async messageChatGPT(messageDto) {
        var _a, _b;
        const configuration = new openai_1.Configuration({
            apiKey: "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"
        });
        const openai = new openai_1.OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: messageDto.content,
            max_tokens: 1024,
            temperature: 0.1
        });
        return (((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.choices) === null || _b === void 0 ? void 0 : _b[0].text) || "AI 挂了").trim();
    }
};
WechartGPTService = __decorate([
    (0, common_1.Injectable)()
], WechartGPTService);
exports.WechartGPTService = WechartGPTService;
//# sourceMappingURL=wechartGPT.service.js.map