import { Request, Response } from 'express';
import { User } from '../../../database/model/user/User.model';

export async function searchUser(req: Request, res: Response) {
	res.json(await User.findBy(req.body));
}
