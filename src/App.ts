
import express from "express"
import mapper from "./Helpers/Mapper"
import { msg, success } from "./Helpers/Logger"
import cors from "cors"
import { config } from "dotenv"; config()

const app = express()
app.use(express.json())
app.use(cors({ allowedHeaders: "*", origin: "*" }))

const port = 50000

const configServer = async () => {
    const map = await mapper()
    map.forEach((router) => {
        app.use('/' + router.path, router.fun)
        msg(`Route /${router.path} has been added`)
    });

    app.listen(port, () => {
        msg("Server launched successfully");
    })
}

configServer()
