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
    console.log(req.body);
    if (!req.body.paragraph || !req.body.chat_id)
        return { message: "Invalid Request", success: false, data: null };
    let user = req.headers.user;
    console.log(user);
    let prompt = `You are a teacher. you have to explain the paragraph below as a script. it may be a pargraph or question. you can also use examples to explain it . To say something, wrap the content int the tag <aud></aud>. To write something on board, wrap the content in the tag <wrt></wrt>. To show a picture on board, wrap the image description in the tag <img>sample: a red ball on table grpahics</img> so that i can generate it using my model. use </clr> to clear board including title.
    always try to write before speaking

    in wrt tag, if it is using other tags inside wrt, the last tag which contain text should given with id named "text". if there is not tag, wrap content in div with id "text" (this is must)

    it should be used html tag and inline css inside <wrt></wrt> tag to show styled text on board. use tags like b and i for bold and italic text. for example: <wrt><b>Newtons second law</b><i>states that lorem ipsum</i></wrt>
    must use mathjax script for writing mathematical equations. for example: <wrt>$$x^2 + 5 = 10$$</wrt>
    when the prompt/parahraph asks for a table you can also use html table tag to show data. it should be styled using inline css
    must split all tags with <SPLITTER> tag. for example: <wrt><h1>This is title</h1></wrt><SPLITTER><aud>the sum of x square and 5 is equal to 10</aud>
    not that there is no need to write mathjax script in aud tag

    example of using tags: <wrt><h1 id="text">This is title</h1></wrt>.<wrt><div id="text">Noraml text</div></wrt>
    example of using tags: <aud>the sum of x square and 5 is equal to 10</aud>
    example of using tags: <img>sample: a red ball on table graphics</img>
    example of using tags: </clr>

    always give detailed explanation of paragraph unless it is said to give short explanation
    always write what is speaking before speaking
    always try to write before speaking
    always use mathjax script for writing mathematical equations. for example: <wrt>$-b \\pm \\sqrt{b^2 - 4ac}$</wrt>
    i should never use mathJax in aud tag
    
    MathJaxConfig = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true,
    },
    options: {
        renderActions: {
            addMenu: [0, '', ''],
        },
    },
    };


    prompt/paragraph : ${req.body.paragraph}
    script : `;
    let data = (await (0, gemini_service_1.generate)(prompt));
    (0, Logger_1.msg)('script generates successfully');
    (0, Logger_1.msg)('processing phase : 1 out of3');
    data = data.split('<SPLITTER>');
    (0, Logger_1.msg)('processing phase : 2 out of 3');
    let modified = await new AsyncLoop_1.default().run(data, async (item) => {
        item = item.replaceAll('<img>\"', '<img>').replaceAll('\"</img>', '</img>');
        if (item.includes('<aud>')) {
            const audText = item.replace('<aud>', '').replace('</aud>', '');
            audText.replaceAll("*", "      ");
            audText.replaceAll("$", "");
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
    (0, Logger_1.msg)('processing phase : 3 out of 3');
    await (0, ai_table_1.addGenerationQuery)({
        prompt: req.body.paragraph,
        script: modified.join('<<<<SPLITTER>>>>'),
        user_id: user.id,
        chat_id: req.body.chat_id
    });
    (0, Logger_1.msg)('script saved successfully');
    return { message: "Success", success: true, data: modified };
};
exports.explainService = explainService;
