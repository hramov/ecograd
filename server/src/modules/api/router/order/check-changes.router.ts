import { Request, Response } from 'express';
import { ROLES } from '../../../../auth/config';
import { AppDataSource } from '../../../database/data-source';
import { Client } from '../../../database/model/user/profiles/Client.model';
import { Expert } from '../../../database/model/user/profiles/Expert.model';
import { User } from '../../../database/model/user/User.model';

export async function checkChanges(req: Request, res: Response) {
	const user = req.user as User;
	let senderId = null;

	if (user.profile == ROLES.Client) {
		const client = await Client.findOneBy({ user: { id: user.id } });
		if (!client) return res.json({ message: 'Cannot find user' });
		senderId = client.id;
	} else if (user.profile == ROLES.Expert) {
		const expert = await Expert.findOneBy({ user: { id: user.id } });
		if (!expert) return res.json({ message: 'Cannot find user' });
		senderId = expert.id;
	} else {
		return res.json({ message: 'User must be either expert or client' });
	}

	const query = `
			SELECT o.id FROM business.order o
			JOIN business.section s ON s."orderId" = o.id
			JOIN business.attach a ON a."orderId" = o.id
			WHERE a.is_new = true AND a."senderId" <> ${senderId};
		`;
	res.json(await AppDataSource.query(query));
}
