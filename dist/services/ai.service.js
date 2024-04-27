"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainService = void 0;
const gemini_service_1 = require("./gemini.service");
const AsyncLoop_1 = __importDefault(require("../Helpers/AsyncLoop"));
const crypto_1 = require("crypto");
const Image_1 = require("../Helpers/Image");
const Logger_1 = require("../Helpers/Logger");
const TTS_1 = __importDefault(require("../Helpers/TTS"));
const ai_table_1 = require("../db/Table/ai.table");
const explainService = async (req) => {
    if (!req.body.paragraph || !req.body.chat_id)
        return { message: "Invalid Request", success: false, data: null };
    let user = req.headers.user;
    console.log(user);
    let prompt = `You are a teacher. you have to explain the paragraph below as a script. you can also use examples to explain it . To say something, wrap the content int the tag <aud></aud>. To write something on board, wrap the content int the tag <wrt></wrt>. To show a picture on board, wrap the image description in the tag <img>sample: a red ball on table grpahics</img> so that i can generate it using my model.use <title>Suitable title</title> tag to change or set title. always there should be a title. use </clr> to clear board including title.
    always try to write before speaking.
    write the teacher script for following paragraph
    use indian simple english for explaining
    do not use any other language

    paragraph : ${req.body.paragraph}
    script : `;
    let data = (await (0, gemini_service_1.generate)(prompt));
    (0, Logger_1.msg)('script generates successfully');
    (0, Logger_1.msg)('processing phase : 1 out of3');
    data = data.replaceAll('\n', '').replaceAll('\\', '');
    data = data.split('</');
    data = data.map((item, position) => {
        if (position === 0) {
            item += '</' + item.split('>')[0].replace('<', '') + '>';
            return item;
        }
        let i = item.split('>');
        i.shift();
        i = i.join('>');
        i += '</' + i.split('>')[0].replace('<', '') + '>';
        return i;
    });
    let modified = await new AsyncLoop_1.default().run(data, async (item) => {
        item = item.replaceAll('<img>\"', '<img>').replaceAll('\"</img>', '</img>');
        if (item.includes('<aud>')) {
            const audText = item.replace('<aud>', '').replace('</aud>', '');
            const fileName = (0, crypto_1.randomUUID)() + '.mp3';
            const path = process.cwd() + `/public/audio/${fileName}`;
            await (0, TTS_1.default)(audText, path);
            return `<aud>${fileName}</aud>`;
        }
        else if (item.includes('<img>')) {
            let prompt = item.replace('<img>', '').replace('</img>', '');
            let imageLink = await (0, Image_1.bingImageLinkScrapper)(prompt);
            return `<img>${imageLink[0]}</img>`;
        }
        else {
            return item;
        }
    });
    await (0, ai_table_1.addGenerationQuery)({
        prompt: req.body.paragraph,
        script: modified.join('<<<<SPLITTER>>>>'),
        user_id: user.id,
        chat_id: req.body.chat_id
    });
    return { message: "Success", success: true, data: modified };
};
exports.explainService = explainService;
