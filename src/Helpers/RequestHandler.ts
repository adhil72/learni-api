import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, service: (req: Request) => Promise<{ message: string, data: any }>) => {
    const data = await service(req).then((data) => ({ ...data, success: true })).catch((err) => {
        console.log(err);
        return { message: err.message, success: false, data: null }
    })
    if (!data.success) return res.status(500).send(data)
    return res.send(data)
}