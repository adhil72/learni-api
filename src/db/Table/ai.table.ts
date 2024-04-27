import { randomUUID } from 'crypto'
import db from '../config'
import { chats } from 'telegram/client'

const table = 'generations'

const addGenerationQuery = async (data: { prompt: string, script: string, user_id: string, chat_id: string }) => {
    data.prompt = db.stringFormatter(data.prompt)
    data.script = db.stringFormatter(data.script)
    const q = `INSERT INTO ${table} (id, prompt, script, user_id, chat_id) VALUES ('${randomUUID()}' ,'${data.prompt}', '${data.script}', '${data.user_id}', '${data.chat_id}')`
    await db.client.query(q)
}

const getGenerationsQuery = async (user_id: string) => {
    let res = await db.client.query(`SELECT * FROM ${table} WHERE user_id='${user_id}'`)
    res.rows.forEach((row: any) => row.prompt = db.stringFormatterRev(row.prompt))
    return res.rows
}


export { addGenerationQuery, getGenerationsQuery }