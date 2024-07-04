import { config } from 'dotenv'; config()
import express from 'express';
import cors from 'cors';
import { msg } from './Helpers/Logger';
import mapper from './Helpers/Mapper';
import { createFolder } from './Helpers/File';
import authentication from './middleware/authentication';
import db from "./db/config"

const app = express()
app.use(express.json())
app.use(cors({ allowedHeaders: '*', origin: '*', methods: '*', credentials: true }))

const port = 50000;

function configurePath() {
    let cwd = process.cwd()
    let path = cwd + '/public'
    let audio = path + '/audio'
    createFolder(path)
    createFolder(audio)
}

const configServer = async () => {
    const map = await mapper()
    app.use(authentication)
    map.forEach((router) => { app.use('/' + router.path, router.fun); msg(`Route /${router.path} has been added`) });
    app.get("/", (req, res) => res.send("Running"))
    configurePath()
    await db.connect()
    app.listen(port, () => msg("Server launched successfully"))
}

configServer()
