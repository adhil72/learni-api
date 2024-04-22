import { Request } from "express";
import { generate } from "./gemini.service";
import AsyncLoop from "../Helpers/AsyncLoop";
import axios, { AxiosResponse } from "axios";
import { createWriteStream, writeFileSync } from 'fs'
import { randomUUID } from "crypto"
import { bingImageLinkScrapper } from "../Helpers/Image";
import { msg } from "../Helpers/Logger";
import TTS from "../Helpers/TTS";

const ttsInstance = axios.create({ baseURL: 'http://localhost:5000' })

export const explainService = async (req: Request) => {
    let prompt = `You are a teacher. you have to explain the paragraph below as a script. you can also use examples to explain it . To say something, wrap the content int the tag <aud></aud>. To write something on board, wrap the content int the tag <wrt></wrt>. To show a picture on board, wrap the image description in the tag <img>sample: a red ball on table grpahics</img> so that i can generate it using my model.use <title>Suitable title</title> tag to change or set title. always there should be a title. use </clr> to clear board including title.
    always try to write before speaking.
    write the teacher script for following paragraph
    
    paragraph : ${req.body.paragraph}
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

    return { message: "Success", data: modified }
}