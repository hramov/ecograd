import { Request, Response } from 'express';
import { Order } from '../../../database/model/order/Order.model';
import { User } from '../../../database/model/user/User.model';

export async function checkChanges(req: Request, res: Response) {
	const user = req.user as User;
	const senderId = user.id;

	const query = `
			SELECT o.id as order_id, s.id as section_id, a.id as attach_id FROM business.order o
			JOIN business.section s ON s."orderId" = o.id
			JOIN business.attach a ON a."sectionId" = s.id
			WHERE a.is_new = true AND a."senderId" <> ${senderId}
		`;

	const result = await Order.query(query);
	console.log(result);
	res.json(result);
}
