"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt_1 = require("../Helpers/Jwt");
const publicRoutes = ['/v1/auth'];
function authentication(req, res, next) {
    var _a;
    if (publicRoutes.includes(req.path))
        return next();
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).send({ message: 'Unauthorized', success: false, data: null });
    let user = (0, Jwt_1.verify)(token);
    if (!user)
        return res.status(401).send({ message: 'Unauthorized', success: false, data: null });
    req.headers.user = user;
    next();
}
exports.default = authentication;
