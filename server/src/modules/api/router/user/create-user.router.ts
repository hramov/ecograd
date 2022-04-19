import { Request, Response } from 'express';
import { ROLES } from '../../../../auth/config';
import { Admin } from '../../../database/model/user/profiles/Admin.model';
import { Client } from '../../../database/model/user/profiles/Client.model';
import { Expert } from '../../../database/model/user/profiles/Expert.model';
import { User } from '../../../database/model/user/User.model';

export async function createUser(req: Request, res: Response) {
	const user = req.body;
	const result = User.create(user);
	await result.save();

	let error = null;

	switch (user.profile) {
		case ROLES.Admin:
			const admin = Admin.create({
				user: result,
			});
			await admin.save();
			break;
		case ROLES.Expert:
			const expert = Expert.create({
				certificate: user.certificate,
				direction: user.direction,
				misc: user.misc,
				position: user.position,
				phone: user.phone,
				user: result,
			});
			await expert.save();
			break;
		case ROLES.Client:
			const client = Client.create({
				phone: user.phone,
				user: result,
			});
			await client.save();
			break;
		default:
			error = new Error('Профиль не опознан');
	}

	if (res) {
		res.json(error ? error : result);
	} else {
		return error ? error : result;
	}
}
