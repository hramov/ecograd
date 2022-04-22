import { Request, Response } from 'express';
import { ROLES } from '../../../../auth/config';
import { Admin } from '../../../database/model/user/profiles/Admin.model';
import { Client } from '../../../database/model/user/profiles/Client.model';
import { Expert } from '../../../database/model/user/profiles/Expert.model';
import { User } from '../../../database/model/user/User.model';
import { BadRequestError } from '../../../error/http/bad-request.error';

export async function createUser(req: Request, res: Response) {
	const user = req.body.user;
	const profile = req.body.profile;

	if (!req.body.user.name || !req.body.profile) return BadRequestError(res);

	const result = User.create({
		name: user.name,
		email: user.email,
		password: user.password,
		profile: user.profile,
	});
	console.log(result);
	const savedUser = await result.save();

	let error = null;

	switch (user.profile) {
		case ROLES.Admin:
			const admin = Admin.create({
				user: savedUser,
			});
			await admin.save();
			break;
		case ROLES.Expert:
			const expert = Expert.create({
				certificate: profile.certificate,
				direction: profile.direction,
				misc: profile.misc,
				position: profile.position,
				phone: profile.phone,
				user: savedUser,
			});
			await expert.save();
			break;
		case ROLES.Client:
			const client = Client.create({
				phone: profile.phone,
				user: savedUser,
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
