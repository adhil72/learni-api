import { randomUUID } from "crypto"
import db from "../config"

const tableName = "chats"
const generationsTableName = "generations"

const createNewChatQuery = async (userId: string) => db.client.query(`INSERT INTO ${tableName} (id, user_id) VALUES ('${randomUUID()}' ,'${userId}') RETURNING *`)
const getChatByIdQuery = async (id: string) => db.client.query(`SELECT * FROM ${tableName} WHERE id = '${id}'`)
const fetchUserChatsQuery = async (userId: string) => db.client.query(`SELECT id FROM ${tableName} WHERE user_id = '${userId}'`)
const fetchChatGenerations = async (chatId: string) => db.client.query(`SELECT * FROM ${generationsTableName} WHERE chat_id = '${chatId}'`)

export { createNewChatQuery, getChatByIdQuery, fetchUserChatsQuery, fetchChatGenerations }