import { Model } from "mongoose";
import { WeChatMessage, WeChatMessageDocument } from "./schemas/weChatMessage.schema";
import { ConfigService } from "@nestjs/config";
export declare class WeChatService {
    private readonly weChatMessageModel;
    private configService;
    constructor(weChatMessageModel: Model<WeChatMessageDocument>, configService: ConfigService);
    OPENAI_MODEL: string;
    OPENAI_MAX_TOKEN: number;
    LIMIT_HISTORY_MESSAGES: number;
    CONVERSATION_MAX_AGE: number;
    ADJACENT_MESSAGE_MAX_INTERVAL: number;
    WAIT_MESSAGE: string;
    NO_MESSAGE: string;
    CLEAR_MESSAGE: string;
    HELP_MESSAGE: string;
    sleep(ms: number | undefined): Promise<unknown>;
    toTextXML(toUser: string, fromUser: string, content: string): string;
    processCommandText({ fromUser, content }: {
        fromUser: string;
        content: string;
    }): Promise<string>;
    buildOpenAIPrompt(fromUser: any, question: any): Promise<false | {
        role: string;
        content: any;
    }[]>;
    getOpenAIReply(prompt: any): Promise<{
        error: string;
        answer?: undefined;
    } | {
        answer: any;
        error?: undefined;
    }>;
    replyText(message: {
        eventId: string;
        content: string;
        fromUser: string;
        createTime: string;
    }): Promise<any>;
    checkEvent(payload: any): Promise<boolean>;
    findOne(query: object): Promise<any>;
    createData(createDto: any): Promise<(WeChatMessage & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    update(updateDto: any): Promise<(WeChatMessage & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    findAll(query: object): Promise<(WeChatMessage & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    generateTextReply(msg: {
        ToUserName: string;
        FromUserName: string;
        Content: string;
        MsgId: string;
        CreateTime: string;
    }): Promise<string>;
    generateFocusOnReply(toUser: string, fromUser: string): string;
}
