"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Logger_1 = require("./Helpers/Logger");
const Mapper_1 = __importDefault(require("./Helpers/Mapper"));
const File_1 = require("./Helpers/File");
const authentication_1 = __importDefault(require("./middleware/authentication"));
const config_1 = __importDefault(require("./db/config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ allowedHeaders: '*', origin: '*', methods: '*', credentials: true }));
const port = 50000;
function configurePath() {
    let cwd = process.cwd();
    let path = cwd + '/public';
    let audio = path + '/audio';
    (0, File_1.createFolder)(path);
    (0, File_1.createFolder)(audio);
}
const configServer = async () => {
    const map = await (0, Mapper_1.default)();
    app.use(authentication_1.default);
    map.forEach((router) => { app.use('/' + router.path, router.fun); (0, Logger_1.msg)(`Route /${router.path} has been added`); });
    app.get("/", (req, res) => res.send("Running"));
    configurePath();
    await config_1.default.connect();
    app.listen(port, () => (0, Logger_1.msg)("Server launched successfully"));
};
configServer();
