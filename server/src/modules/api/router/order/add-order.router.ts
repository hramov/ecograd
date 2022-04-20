import { Request, Response } from 'express';
import { Order } from '../../../database/model/order/Order.model';
import { Client } from '../../../database/model/user/profiles/Client.model';
import { User } from '../../../database/model/user/User.model';

export async function addOrder(req: Request, res: Response) {
	const user = req.user as User;
	const client = await Client.findOneBy({ user: { id: user.id } });

	if (!client) {
		return res.json({
			message: 'Cannot find client',
		});
	}

	const order = Order.create({
		title: req.body.title,
		type: req.body.type,
		status: 'new',
		client: client,
		expert: null,
	});

	await order.save();
	res.json(order);
}
