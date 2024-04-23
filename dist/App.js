"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Mapper_1 = __importDefault(require("./Helpers/Mapper"));
const Logger_1 = require("./Helpers/Logger");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ allowedHeaders: "*", origin: "*" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
const port = 3000;
const configServer = async () => {
    const map = await (0, Mapper_1.default)();
    map.forEach((router) => {
        app.use('/' + router.path, router.fun);
        (0, Logger_1.msg)(`Route /${router.path} has been added`);
    });
    app.get("/", (req, res) => {
        res.send("Running");
    });
    app.listen(port, () => {
        (0, Logger_1.msg)("Server launched successfully");
    });
};
configServer();
