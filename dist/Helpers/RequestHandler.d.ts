import { Request, Response } from "express";
declare const _default: (req: Request, res: Response, service: (req: Request) => Promise<{
    message: string;
    data: any;
}>) => Promise<Response<any, Record<string, any>>>;
export default _default;
