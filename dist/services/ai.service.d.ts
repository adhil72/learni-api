import { Request } from "express";
export declare const explainService: (req: Request) => Promise<{
    message: string;
    success: boolean;
    data: any;
}>;
