
import express from "express"
import mapper from "./Helpers/Mapper"
import { msg, success } from "./Helpers/Logger"
import cors from "cors"
import { config } from "dotenv"; config()

const app = express()
app.use(express.json())
app.use(cors({ allowedHeaders: "*", origin: "*" }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const port = 3000

const configServer = async () => {
    const map = await mapper()
    map.forEach((router) => {
        app.use('/' + router.path, router.fun)
        msg(`Route /${router.path} has been added`)
    });

    app.get("/", (req, res) => {
        res.send("Running")
    })

    app.listen(port, () => {
        msg("Server launched successfully");
    })
}

configServer()
