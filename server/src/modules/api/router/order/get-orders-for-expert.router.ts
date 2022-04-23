import { Request, Response } from 'express';

import { Attach } from '../../../database/model/order/Attach.model';
import { Order } from '../../../database/model/order/Order.model';
import { Section } from '../../../database/model/order/Section.model';
import { User } from '../../../database/model/user/User.model';

export async function getOrdersForExpert(req: Request, res: Response) {
	const user = req.user as User;
	const orders = await Order.findBy({ expert: { id: user.id } });
	for (const order of orders) {
		order.sections = await Section.find({
			where: {
				order: { id: order.id },
			},
			order: { arrange: 'ASC' },
		});
		for (const section of order.sections) {
			section.attach = await Attach.findBy({
				section: { id: section.id },
			});
		}
	}
	res.json(orders);
}
