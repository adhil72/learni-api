import { Request } from "express";
export declare const authService: (req: Request) => Promise<{
    message: string;
    success: boolean;
    data: {
        token: string;
    };
}>;
export declare const updatePassword: (req: Request) => Promise<{
    message: string;
    success: boolean;
    data: {};
}>;
