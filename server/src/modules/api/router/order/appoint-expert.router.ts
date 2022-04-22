import { Request, Response } from 'express';
import { Order } from '../../../database/model/order/Order.model';
import { Expert } from '../../../database/model/user/profiles/Expert.model';
import { BadRequestError } from '../../../error/http/bad-request.error';
import { NotFoundError } from '../../../error/http/not-found.error';

export async function appointExpert(req: Request, res: Response) {
	const order_id = req.params.order_id as string;
	const expert_id = req.body.expert_id as string;

	if (!order_id || !expert_id) return BadRequestError(res);

	const order = await Order.findOneBy({
		id: parseInt(order_id),
		expert: null,
	});
	if (!order) {
		return NotFoundError(
			res,
			'order',
			'Cannot find order with id ' +
				order_id +
				' or the order might already has expert appointed',
		);
	}

	const expert = await Expert.findOneBy({ id: parseInt(expert_id) });
	if (!expert) {
		return NotFoundError(
			res,
			'expert',
			'Cannot find expert with id ' + expert_id,
		);
	}

	order.expert = expert;
	order.status = 'taken';
	await order.save();

	res.json(order);
}
