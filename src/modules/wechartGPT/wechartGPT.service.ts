import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi } from "openai";
import { MessageDto } from "./dto/message";

@Injectable()
export class WechartGPTService {
  async messageChatGPT(messageDto: MessageDto): Promise<any> {
    const configuration = new Configuration({
      // organization: "org-e9tSsKMBgW93fiGhmULf5OfF",
      apiKey: "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"
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
