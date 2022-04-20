import { Request, Response } from 'express';
import { Order } from '../../../database/model/order/Order.model';
import { Expert } from '../../../database/model/user/profiles/Expert.model';

export async function appointExpert(req: Request, res: Response) {
	const order_id = req.params.order_id as string;
	const expert_id = req.body.expert_id as string;

	const order = await Order.findOneBy({
		id: parseInt(order_id),
		expert: null,
	});
	if (!order) {
		return res.json({
			message:
				'Cannot find order with id ' +
				order_id +
				' or the order might already has expert appointed',
		});
	}

	const expert = await Expert.findOneBy({ id: parseInt(expert_id) });
	if (!expert) {
		return res.json({
			message: 'Cannot find expert with id ' + expert_id,
		});
	}

	order.expert = expert;
	await order.save();

	res.json(order);
}
