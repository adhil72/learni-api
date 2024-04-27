import { NextFunction, Request, Response } from "express";
export default function authentication(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
