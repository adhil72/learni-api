"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt_1 = require("../Helpers/Jwt");
const Logger_1 = require("../Helpers/Logger");
const publicRoutes = ['/v1/auth', '/v1/file'];
function authentication(req, res, next) {
    var _a;
    (0, Logger_1.msg)('path ' + req.path);
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
