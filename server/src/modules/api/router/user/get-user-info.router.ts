import { Request, Response } from 'express';
import { User } from '../../../database/model/user/User.model';
import { SendSuccessGetReply } from '../../utils/send-success-reply';

export async function getUserInfo(req: Request, res: Response) {
	const user = req.user as User;
	SendSuccessGetReply<User>(res, user);
}
