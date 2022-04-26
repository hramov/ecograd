import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../../../database/model/user/User.model';
import { SendSuccessGetReply } from '../../utils/send-success-reply';

export function login(req: Request, res: Response) {
	const user = req.user as User;
	SendSuccessGetReply(res, {
		access_token: sign(
			{ sub: user.id, email: user.email, profile: user.profile },
			'secret',
		),
	});
}
