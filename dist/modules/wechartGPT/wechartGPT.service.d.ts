import { MessageDto } from "./dto/message";
import { ConfigService } from "@nestjs/config";
export declare class WechartGPTService {
    private configService;
    constructor(configService: ConfigService);
    sendTextMsg(): Promise<any>;
    messageChatGPT(messageDto: MessageDto): Promise<any>;
}
