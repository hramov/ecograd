import "reflect-metadata";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import appRootPath from 'app-root-path'

import router from './src/router'
import { toConsole } from './src/utils/log'
import { Database } from './src/database/Database'
import { TelegramController } from "./src/controllers/Telegram/TelegramController";

async function main() {
    const db = new Database()
    await db.connect()

    const app = express()
    const port: number = 5000

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use('/static', express.static(appRootPath + '/uploads/'))

    const tc = new TelegramController()
    tc.listen()

    app.use(cors())
    app.use('/api/v1/', router)

    app.listen(port, () => {
        toConsole(`Server started on http://localhost:${port}`, 'info')
    })
}

main()