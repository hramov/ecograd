import { Request, Response } from 'express';
import { Order } from '../../../database/model/order/Order.model';
import { BadRequestError } from '../../../error/http/bad-request.error';
import { NotFoundError } from '../../../error/http/not-found.error';

export async function changeOrderStatus(req: Request, res: Response) {
	const order_id = req.body.order_id as string;
	const status = req.body.status as string;

	if (!order_id || !status) return BadRequestError(res);

	const order = await Order.findOneBy({ id: parseInt(order_id) });

	if (!order) {
		return NotFoundError(
			res,
			'order',
			'Cannot find order with id ' + order_id,
		);
	}

	order.status = status;
	await order.save();

	res.json({
		message: 'Successfully updated order with status ' + status,
	});
}
