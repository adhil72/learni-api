"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Mapper_1 = __importDefault(require("./Helpers/Mapper"));
const Logger_1 = require("./Helpers/Logger");
const dotenv_1 = require("dotenv");
const File_1 = require("./Helpers/File");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = 3000;
function configurePath() {
    let cwd = process.cwd();
    let path = cwd + '/public';
    let audio = path + '/audio';
    (0, File_1.createFolder)(path);
    (0, File_1.createFolder)(audio);
}
const configServer = async () => {
    const map = await (0, Mapper_1.default)();
    map.forEach((router) => { app.use('/' + router.path, router.fun); (0, Logger_1.msg)(`Route /${router.path} has been added`); });
    app.get("/", (req, res) => res.send("Running"));
    configurePath();
    app.listen(port, () => (0, Logger_1.msg)("Server launched successfully"));
};
configServer();
