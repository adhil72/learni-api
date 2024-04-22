"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gtts_1 = __importDefault(require("gtts"));
const language = 'en';
exports.default = (text, path) => {
    const gttsInstance = new gtts_1.default(text, language);
    return new Promise((resolve, reject) => {
        gttsInstance.save(path, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Audio file saved successfully!');
            }
        });
    });
};
