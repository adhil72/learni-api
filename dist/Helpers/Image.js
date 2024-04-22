"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bingImageLinkScrapper = void 0;
const axios_1 = __importDefault(require("axios"));
const bingImageLinkScrapper = async (search) => {
    const url = `https://www.bing.com/images/search?q=${search}`;
    const response = await axios_1.default.get(url);
    const re = /https:\/\/[0-9a-zA-Z.\/\-_]*\.(png|jpg|jpeg|gif|bmp|svg)/;
    const matches = response.data.match(re);
    const res = (matches === null || matches === void 0 ? void 0 : matches.slice(0, 5)) || [];
    const availableImages = await Promise.all(res.map(async (item) => {
        try {
            await axios_1.default.head(item);
            return item;
        }
        catch (error) {
            return "";
        }
    }));
    return availableImages.filter((i) => i !== "");
};
exports.bingImageLinkScrapper = bingImageLinkScrapper;
