"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRoutes = (0, express_1.Router)();
AuthRoutes.get('/login', (req, res) => {
    res.send('Login');
});
exports.default = AuthRoutes;
