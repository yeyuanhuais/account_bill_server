import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi } from "openai";
import { MessageDto } from "./dto/message";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class WechartGPTService {
  constructor(private configService: ConfigService) {}
  async sendTextMsg(): Promise<any> {
    return "AI 挂了";
  }
  async messageChatGPT(messageDto: MessageDto): Promise<any> {
    const configuration = new Configuration({
      // organization: "org-e9tSsKMBgW93fiGhmULf5OfF",
      apiKey: this.configService.get<string>("CHATGPT_APIKEY")
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: messageDto.content,
      max_tokens: 1024,
      temperature: 0.1
    });
    return (response?.data?.choices?.[0].text || "AI 挂了").trim();
  }
}
