"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFile = async (req, res) => {
    const fileName = req.query.fileName;
    const filePath = process.cwd() + `/public/audio/${fileName}`;
    res.download(filePath);
};
exports.default = { getFile };
