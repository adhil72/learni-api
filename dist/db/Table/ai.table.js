"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerationsQuery = exports.addGenerationQuery = void 0;
const crypto_1 = require("crypto");
const config_1 = __importDefault(require("../config"));
const table = 'generations';
const addGenerationQuery = async (data) => {
    data.prompt = config_1.default.stringFormatter(data.prompt);
    data.script = config_1.default.stringFormatter(data.script);
    const q = `INSERT INTO ${table} (id, prompt, script, user_id, chat_id) VALUES ('${(0, crypto_1.randomUUID)()}' ,'${data.prompt}', '${data.script}', '${data.user_id}', '${data.chat_id}')`;
    await config_1.default.client.query(q);
};
exports.addGenerationQuery = addGenerationQuery;
const getGenerationsQuery = async (user_id) => {
    let res = await config_1.default.client.query(`SELECT * FROM ${table} WHERE user_id='${user_id}'`);
    res.rows.forEach((row) => row.prompt = config_1.default.stringFormatterRev(row.prompt));
    return res.rows;
};
exports.getGenerationsQuery = getGenerationsQuery;
