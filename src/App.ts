
import express from "express"
import mapper from "./Helpers/Mapper"
import { msg, success } from "./Helpers/Logger"
import cors from "cors"
import { config } from "dotenv"; import { createFolder } from "./Helpers/File";
config()

const app = express()
app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = 3000;

function configurePath() {
    let cwd = process.cwd()
    let path = cwd + '/public'
    let audio = path + '/audio'
    createFolder(path)
    createFolder(audio)
}

const configServer = async () => {
    const map = await mapper()
    map.forEach((router) => { app.use('/' + router.path, router.fun); msg(`Route /${router.path} has been added`) });
    app.get("/", (req, res) => res.send("Running"))
    configurePath()
    app.listen(port, () => msg("Server launched successfully"))
}

configServer()
