import { config } from 'dotenv'; config()
import express from 'express';
import cors from 'cors';
import { msg } from './Helpers/Logger';
import mapper from './Helpers/Mapper';
import { createFolder } from './Helpers/File';

const app = express()
app.use(express.json())
app.use(cors({ allowedHeaders: '*', origin: '*', methods: '*', credentials: true }))
app.use((r,_,n) => { msg(`${r.method} ${r.path}`); n() })

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
    map.forEach((router) => { app.use('/' + router.path, router.fun); msg(`Route /${router.path} has been added`) });
    app.get("/", (req, res) => res.send("Running"))
    configurePath()
    app.listen(port, () => msg("Server launched successfully"))
}

configServer()
