import { Request, Response } from 'express';
import { Order } from '../../../database/model/order/Order.model';

export async function getOrdersWithoutExpert(req: Request, res: Response) {
	return await Order.findBy({ expert: null });
}
