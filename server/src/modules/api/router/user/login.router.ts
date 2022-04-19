import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../../../database/model/user/User.model';

export function login(req: Request, res: Response) {
	const user = req.user as User;
	res.json({
		access_token: sign(
			{ sub: user.id, email: user.email, profile: user.profile },
			'secret',
		),
	});
}
