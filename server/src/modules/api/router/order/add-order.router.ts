import { Request, Response } from 'express';
import { Order } from '../../../database/model/order/Order.model';
import { Client } from '../../../database/model/user/profiles/Client.model';
import { User } from '../../../database/model/user/User.model';
import { NotFoundError } from '../../../error/http/not-found.error';

export async function addOrder(req: Request, res: Response) {
	const user = req.user as User;
	const client = await Client.findOneBy({ id: user.id });

	if (!client) {
		return NotFoundError(res, 'client');
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
