"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = void 0;
const fs_1 = require("fs");
const createFolder = (folderPath) => {
    if (!(0, fs_1.existsSync)(folderPath)) {
        (0, fs_1.mkdirSync)(folderPath, { recursive: true });
    }
};
exports.createFolder = createFolder;
