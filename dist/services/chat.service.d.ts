import { Request } from "express";
export declare const createChatService: (req: Request) => Promise<{
    message: string;
    success: boolean;
    data: any;
}>;
export declare const getChatService: (req: Request) => Promise<{
    message: string;
    success: boolean;
    data: any[];
}>;
export declare const getChatGenerationsService: (req: Request) => Promise<{
    message: string;
    success: boolean;
    data: any[];
}>;
