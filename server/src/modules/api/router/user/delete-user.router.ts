import { Request, Response } from 'express';
import { User } from '../../../database/model/user/User.model';

export async function deleteUser(req: Request, res: Response) {
	res.json(await User.delete(parseInt(req.params.id)));
}
