"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChatGenerations = exports.fetchUserChatsQuery = exports.getChatByIdQuery = exports.createNewChatQuery = void 0;
const crypto_1 = require("crypto");
const config_1 = __importDefault(require("../config"));
const tableName = "chats";
const generationsTableName = "generations";
const createNewChatQuery = async (userId) => config_1.default.client.query(`INSERT INTO ${tableName} (id, user_id) VALUES ('${(0, crypto_1.randomUUID)()}' ,'${userId}') RETURNING *`);
exports.createNewChatQuery = createNewChatQuery;
const getChatByIdQuery = async (id) => config_1.default.client.query(`SELECT * FROM ${tableName} WHERE id = '${id}'`);
exports.getChatByIdQuery = getChatByIdQuery;
const fetchUserChatsQuery = async (userId) => config_1.default.client.query(`SELECT id FROM ${tableName} WHERE user_id = '${userId}'`);
exports.fetchUserChatsQuery = fetchUserChatsQuery;
const fetchChatGenerations = async (chatId) => config_1.default.client.query(`SELECT * FROM ${generationsTableName} WHERE chat_id = '${chatId}'`);
exports.fetchChatGenerations = fetchChatGenerations;
