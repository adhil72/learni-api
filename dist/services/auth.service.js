"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.authService = void 0;
const users_table_1 = require("../db/Table/users.table");
const crypto_1 = require("crypto");
const bcrypt_1 = require("bcrypt");
const Jwt_1 = require("../Helpers/Jwt");
const authService = async (req) => {
    let data = req.body;
    let user = await (0, users_table_1.getUserWithEmailQuery)(data.email);
    if (user) {
        if ((0, bcrypt_1.compareSync)(data.password, user.password)) {
            let token = (0, Jwt_1.sign)({ id: user.id, email: user.email });
            return { message: 'Login successful', success: true, data: { token } };
        }
        throw new Error('Invalid password');
    }
    data.password = (0, bcrypt_1.hashSync)(data.password, 10);
    data.id = (0, crypto_1.randomUUID)();
    await (0, users_table_1.addUserQuery)(data);
    let token = (0, Jwt_1.sign)({ id: data.id, email: data.email });
    return { message: 'User added successfully', success: true, data: { token } };
};
exports.authService = authService;
const updatePassword = async (req) => {
    let data = req.body;
    await (0, users_table_1.updatePasswordQuery)(req.headers.id, data.password);
    return { message: 'Password updated successfully', success: true, data: {} };
};
exports.updatePassword = updatePassword;
