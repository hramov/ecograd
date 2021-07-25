import { Request, Response } from "express-serve-static-core";
import { AuthProvider } from "../providers/AuthProvider";
import { ClientProvider } from "../providers/ClientProvider";
import { Controller, IClient } from "./Controller";

export class ClientController extends Controller {
    
    async getClients(req: Request, res: Response) {
        const result = await new ClientProvider().getExperts()
        if (result.status) {
            res.status(200).json({
                status: result.status,
                data: result.data
            })
        }
    }

    private static async addClient(client: IClient): Promise<{status: boolean, data: IClient | string }> {
        const result = await new AuthProvider().addClient({
            name: client.name,
            last_name: '',
            second_name: '',
            email: client.email,
            phone: client.phone,
            login: client.email,
            password: Date.now().toString(),
            role: 'client',
            telegram_id: 0
        })

        if (result.status) {
            return({
                status: result.status,
                data: result.data as IClient
            })
        }
        return({
            status: result.status,
            data: result.data as string
        })
    }

    async sendOrder(req: Request, res: Response) {
        let client: IClient;
        if (!req.body.user) {
            const result = await ClientController.addClient(req.body.order)
            client = result.data as IClient
        } else {
            client = req.body.client
        }

        console.log(client)

        req.body.order.created_at = new Date(Date.now())
        req.body.order.client = client

        console.log(req.body.order)
        const order = await new ClientProvider().sendOrder(req.body.order)

        console.log(order)
        if (order.status) {
            res.status(200).json({
                status: order.status,
                data: order.data,
                client: client
            })
            return
        }
        res.status(500).json({
            status: order.status,
            data: order.data,
            client: client
        })
        return
        
    }

    async getOrdersForClient(req: Request, res: Response) {

    }

    async getOrdersForClientById(req: Request, res: Response) {

    }
}