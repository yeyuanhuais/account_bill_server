import { WechartGPTService } from "./wechartGPT.service";
import { MessageDto } from "./dto/message";
export declare class WechartGPTController {
    private readonly wechartGPTService;
    constructor(wechartGPTService: WechartGPTService);
    create(messageDto: MessageDto): {
        ToUserName: string;
        FromUserName: string;
        CreateTime: number;
        MsgType: string;
        Content: Promise<any>;
    };
}
