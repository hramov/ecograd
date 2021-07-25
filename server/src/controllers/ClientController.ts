import { Request, Response } from "express-serve-static-core";
import { Controller, IOrder } from "./Controller";
import { sendOrder } from "./Telegram/Messages";

export class ClientController extends Controller {
    
    async sendOrder(req: Request, res: Response) {
        const order: IOrder = {
            name: req.body.order.name,
            email: req.body.order.email,
            company: req.body.order.company,
            object: req.body.order.object,
            phone: req.body.order.phone,
            created_at: new Date(Date.now())
        }

        /** Some validation here */

        // const userProvider = new UserProvider()
        // const result = await userProvider.sendOrder(order)
        // if (result.status) {
        //     res.status(200).send({
        //         status: true,
        //         message: result.error
        //     })
        //     return
        // }
        
        sendOrder(order)

        res.status(200).send({
            status: true,
            message: null
        })
    }

    async getOrdersForClient(req: Request, res: Response) {

    }

    async getOrdersForClientById(req: Request, res: Response) {

    }
}