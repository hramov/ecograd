import { Request, Response } from "express-serve-static-core";
import { AuthProvider } from "../providers/AuthProvider";
import { ClientProvider } from "../providers/ClientProvider";
import { Controller } from "./Controller";
// import { sendOrder } from "./Telegram/Messages";

export class ClientController extends Controller {
    
    async sendOrder(req: Request, res: Response) {

        req.body.order.created_at = new Date(Date.now())
        const result = await new ClientProvider().sendOrder(req.body.order)
        if (result.status) {
            // sendOrder(req.body.order)
            if (!req.body.user.id) {
                const user = await new AuthProvider().addClient({
                    name: req.body.order.name,
                    last_name: '',
                    second_name: '',
                    email: req.body.order.email,
                    phone: req.body.order.phone,
                    login: req.body.order.email,
                    password: Date.now().toString(),
                    role: 'client',
                    telegram_id: 0,
                    orders: [result.data!]
                })
                if (user.status) {
                    res.status(200).send({
                        status: user.status,
                        data: user.data
                    })
                    return
                }
                res.status(500).send({
                    status: user.status,
                    data: user.data
                })
                return
            }
            res.status(200).send({
                status: result.status,
                data: result.data
            })
            return
        }
        res.status(500).send({
            status: result.status,
            data: result.data
        })
    }

    async getOrdersForClient(req: Request, res: Response) {

    }

    async getOrdersForClientById(req: Request, res: Response) {

    }
}