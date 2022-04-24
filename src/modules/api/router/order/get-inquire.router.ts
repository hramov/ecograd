import { Request, Response } from 'express';
import { Inquire } from '../../../database/model/order/Inquire.model';
import { Order } from '../../../database/model/order/Order.model';
import { BadRequestError } from '../../../error/http/bad-request.error';
import { NotFoundError } from '../../../error/http/not-found.error';
import { Logger } from '../../../logger';

export async function getInquire(req: Request, res: Response) {
	if (!req.params.order_id) return BadRequestError(res);

	try {
		const order = await Order.findOneBy({
			id: parseInt(req.params.order_id),
		});

		if (!order) {
			return NotFoundError(res, 'order');
		}

		const inquires = await Inquire.find({
			where: { order: { id: order.id } },
			order: { createdAt: 'DESC' },
		});

		res.json(inquires);
	} catch (_err) {
		const err = _err as Error;
		Logger.writeError(err.message);
		res.json({
			error: err.message,
		});
	}
}
