import { Request } from "express";
import { generate } from "./gemini.service";
import AsyncLoop from "../Helpers/AsyncLoop";
import axios, { AxiosResponse } from "axios";
import { createWriteStream, writeFileSync } from 'fs'
import { randomUUID } from "crypto"
import { bingImageLinkScrapper } from "../Helpers/Image";
import { msg } from "../Helpers/Logger";
import TTS from "../Helpers/TTS";
import { addGenerationQuery } from "../db/Table/ai.table";

export const explainService = async (req: Request) => {
    if (!req.body.paragraph || !req.body.chat_id) return { message: "Invalid Request", success: false, data: null }
    let user = (req.headers as any).user as { email: string, id: string }
    console.log(user);
    let prompt = `You are a teacher. you have to explain the paragraph below as a script. it may be a pargraph or question. you can also use examples to explain it . To say something, wrap the content int the tag <aud></aud>. To write something on board, wrap the content in the tag <wrt></wrt>. To show a picture on board, wrap the image description in the tag <img>sample: a red ball on table grpahics</img> so that i can generate it using my model.use <title>Suitable title</title> tag to change or set title. always there should be a title. use </clr> to clear board including title.
    always try to write before speaking. mathematical expression should written in form that said by MathJax

    it should be used html tag and inline css inside <wrt></wrt> tag to show mathemetical equations and other things 
    when the promtp/parahraph asks for a table you can also use html table tag to show data. it should be styled using inline css

    example of using tags: <wrt><div style="font-size: 18px; font-family: Arial, sans-serif;">x<span style="vertical-align: super; font-size: 0.8em;">2</span> + 5 = 10</div></wrt> //also you can use other html tags like ul,li,h1,h2,h3,h4,h5,h6,span,u,li and etc
    example of using tags: <aud>the sum of x square and 5 is equal to 10</aud>
    example of using tags: <img>sample: a red ball on table graphics</img>
    example of using tags: <title>Simple title</title>
    example of using tags: </clr>

    always give detailed explanation of paragraph unless it is said to give short explanation
    always write what is speaking before speaking

    prompt/paragraph : ${req.body.paragraph}
    script : `
    let data = (await generate(prompt))
    msg('script generates successfully')
    msg('processing phase : 1 out of3')

    data = data.replaceAll('\n', '').replaceAll('\\', '')
    data = data.split('</') as string[]

    data = data.map((item: string, position: number) => {
        if (position === 0) {
            item += '</' + item.split('>')[0].replace('<', '') + '>';
            return item
        }
        let i: any = item.split('>')
        i.shift()
        i = i.join('>')
        i += '</' + i.split('>')[0].replace('<', '') + '>'
        return i
    })

    let modified = await new AsyncLoop().run(data, async (item: string) => {
        item = (item as any).replaceAll('<img>\"', '<img>').replaceAll('\"</img>', '</img>')
        if (item.includes('<aud>')) {
            const audText = item.replace('<aud>', '').replace('</aud>', '')
            const fileName = randomUUID() + '.mp3'
            const path = process.cwd() + `/public/audio/${fileName}`
            await TTS(audText, path)
            return `<aud>${fileName}</aud>`;
        } else if (item.includes('<img>')) {
            let prompt = item.replace('<img>', '').replace('</img>', '')
            let imageLink = await bingImageLinkScrapper(prompt)
            return `<img>${imageLink[0]}</img>`
        } else {
            return item
        }
    })

    await addGenerationQuery(
        {
            prompt: req.body.paragraph,
            script: modified.join('<<<<SPLITTER>>>>'),
            user_id: user.id,
            chat_id: req.body.chat_id
        }
    )
    return { message: "Success", success: true, data: modified }
}
