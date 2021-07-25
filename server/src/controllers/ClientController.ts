import { Request, Response } from "express-serve-static-core";
import { AuthProvider } from "../providers/AuthProvider";
import { ClientProvider } from "../providers/ClientProvider";
import { Controller } from "./Controller";
import { sendOrder } from "./Telegram/Messages";

export class ClientController extends Controller {
    
    async sendOrder(req: Request, res: Response) {

        const result = await new ClientProvider().sendOrder(req.body.order)
        if (result.status) {

            sendOrder(req.body.order)
            if (!req.body.user.id) {
                const user = await new AuthProvider().addUser({
                    name: req.body.order.name,
                    last_name: '',
                    email: req.body.order.email,
                    role: 'client',
                    birthdate: new Date(Date.now()),
                    login: req.body.order.email,
                    password: new Date().toString(),
                    telegram_id: 0,
                })
            }

            res.status(200).send({
                status: true,
                message: result.error
            })
            return
        }

        res.status(500).send({
            status: result.status,
            message: result.error
        })
    }

    async getOrdersForClient(req: Request, res: Response) {

    }

    async getOrdersForClientById(req: Request, res: Response) {

    }
}