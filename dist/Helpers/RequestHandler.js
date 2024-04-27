"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (req, res, service) => {
    const data = await service(req).then((data) => ({ ...data, success: true })).catch((err) => {
        console.log(err);
        return { message: err.message, success: false, data: null };
    });
    if (!data.success)
        return res.status(500).send(data);
    return res.send(data);
};
