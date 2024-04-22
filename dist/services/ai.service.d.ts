import { Request } from "express";
export declare const explainService: (req: Request) => Promise<{
    message: string;
    data: any;
}>;
