"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { bingImageLinkScrapper } = require("./Helpers/Image");
const AsyncLoop_1 = __importDefault(require("./Helpers/AsyncLoop"));
const axios_1 = __importDefault(require("axios"));
// Define your regular expression properly
const re = /https:\/\/[0-9a-zA-Z.\/\-_]*\.(png|jpg|jpeg|gif|bmp|svg)/;
bingImageLinkScrapper("A bar magnet with magnetic field lines").then(async (res) => {
    res = res.map((i) => {
        var _a;
        let link = ((_a = i.match(re)) === null || _a === void 0 ? void 0 : _a[0]) || "";
        return link;
    });
    res = res.filter((i) => i !== "");
    res = await new AsyncLoop_1.default().run(res.slice(0, 5), async (item) => {
        let avail = await axios_1.default.get(item).then(() => true).catch(() => false);
        if (avail)
            return item;
        else
            return "";
    });
    res = res.filter((i) => i !== "");
    require('fs').writeFileSync('test.json', JSON.stringify(res, null, 2));
});
