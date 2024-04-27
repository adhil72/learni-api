"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sign = (data) => jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, { expiresIn: (24 * 30) + 'h' });
exports.sign = sign;
const verify = (token) => jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
exports.verify = verify;
