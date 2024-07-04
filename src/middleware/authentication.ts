import { NextFunction, Request, Response } from "express";
import { verify } from "../Helpers/Jwt";
import { msg } from "../Helpers/Logger";

const publicRoutes = ['/v1/auth', '/v1/file'];

export default function authentication(req: Request, res: Response, next: NextFunction) {
    msg('path ' + req.path);
    if (publicRoutes.includes(req.path)) return next();
    let token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).send({ message: 'Unauthorized', success: false, data: null });
    let user = verify(token);
    if (!user) return res.status(401).send({ message: 'Unauthorized', success: false, data: null });
    (req.headers as any).user = user;
    next();
}