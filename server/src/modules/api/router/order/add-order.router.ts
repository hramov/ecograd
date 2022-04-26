import { Request, Response } from 'express';
import { Order } from '../../../database/model/order/Order.model';
import { Client } from '../../../database/model/user/profiles/Client.model';
import { User } from '../../../database/model/user/User.model';
import { BadRequestError } from '../../../error/http/bad-request.error';
import { NotFoundError } from '../../../error/http/not-found.error';
import { Logger } from '../../../logger';
import { SendSuccessGetReply } from '../../utils/send-success-reply';

export async function addOrder(req: Request, res: Response) {
	const user = req.user as User;

	if (!req.body || !req.body.title) {
		Logger.writeError('addOrder', `No required data`);
		return BadRequestError(res);
	}

	const client = await Client.findOneBy({ id: user.id });

	if (!client) {
		Logger.writeError(
			'addOrder',
			`Cannot find client associated with user ID: ${user.id}`,
		);
		return NotFoundError(res, 'client');
	}

	const order = Order.create({
		title: req.body.title,
		exp_type: req.body.exp_type,
		object_type: req.body.object_type,
		docs_cipher: req.body.docs_cipher,
		rii_cipher: req.body.rii_cipher,
		status: 'new',
		client: client,
		expert: null,
	});

	await order.save();
	Logger.writeInfo(`Successfully added order with ID: ${order.id}`);
	SendSuccessGetReply(res, order);
}
