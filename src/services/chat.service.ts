import { Request } from "express"
import { createNewChatQuery, fetchChatGenerations, fetchUserChatsQuery, getChatByIdQuery } from "../db/Table/chats.table"

export const createChatService = async (req: Request) => {
    let user = (req.headers as any).user as { email: string, id: string }
    let chat = await createNewChatQuery(user.id)
    return { message: "Success", success: true, data: chat.rows[0] }
}

export const getChatService = async (req: Request) => {
    let user = (req.headers as any).user as { email: string, id: string }
    let chat = await fetchUserChatsQuery(user.id)
    return { message: "Success", success: true, data: chat.rows }
}

export const getChatGenerationsService = async (req: Request) => {
    let chatId = req.query.id as string
    let generations = await fetchChatGenerations(chatId)
    console.log(generations.rows);
    
    return { message: "Success", success: true, data: generations.rows }
}