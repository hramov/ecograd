import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { OrderAccess } from '../../database/access/order.access';

@autoInjectable()
export class OrderController {
	constructor(private readonly orderAccess?: OrderAccess) {}

	public async getOrders(req: Request, res: Response) {
		res.json(await this.orderAccess.getOrders());
	}
}
