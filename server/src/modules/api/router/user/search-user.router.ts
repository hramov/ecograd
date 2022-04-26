import { Request, Response } from 'express';
import { User } from '../../../database/model/user/User.model';
import { SendSuccessGetReply } from '../../utils/send-success-reply';

export async function searchUser(req: Request, res: Response) {
	SendSuccessGetReply(res, await User.findBy(req.body));
}
