"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatGenerationsService = exports.getChatService = exports.createChatService = void 0;
const chats_table_1 = require("../db/Table/chats.table");
const createChatService = async (req) => {
    let user = req.headers.user;
    let chat = await (0, chats_table_1.createNewChatQuery)(user.id);
    return { message: "Success", success: true, data: chat.rows[0] };
};
exports.createChatService = createChatService;
const getChatService = async (req) => {
    let user = req.headers.user;
    let chat = await (0, chats_table_1.fetchUserChatsQuery)(user.id);
    return { message: "Success", success: true, data: chat.rows };
};
exports.getChatService = getChatService;
const getChatGenerationsService = async (req) => {
    let chatId = req.query.id;
    let generations = await (0, chats_table_1.fetchChatGenerations)(chatId);
    return { message: "Success", success: true, data: generations.rows };
};
exports.getChatGenerationsService = getChatGenerationsService;
