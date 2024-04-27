"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordQuery = exports.getUserWithEmailQuery = exports.addUserQuery = void 0;
const config_1 = __importDefault(require("../config"));
const table = 'users';
const addUserQuery = async (data) => await config_1.default.client.query(`INSERT INTO ${table} (id, email, password) VALUES ('${data.id}', '${data.email}', '${data.password}')`);
exports.addUserQuery = addUserQuery;
const updatePasswordQuery = async (id, password) => await config_1.default.client.query(`UPDATE ${table} SET password = ${password} WHERE id = ${id}`);
exports.updatePasswordQuery = updatePasswordQuery;
const getUserWithEmailQuery = async (email) => await config_1.default.client.query(`SELECT * FROM ${table} WHERE email = '${email}'`).then((res) => { return res.rows[0]; });
exports.getUserWithEmailQuery = getUserWithEmailQuery;
