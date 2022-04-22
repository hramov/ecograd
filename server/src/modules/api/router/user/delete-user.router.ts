import { Request, Response } from 'express';
import { User } from '../../../database/model/user/User.model';
import { BadRequestError } from '../../../error/http/bad-request.error';

export async function deleteUser(req: Request, res: Response) {
	if (!req.params.id) return BadRequestError(res);
	res.json(await User.delete(parseInt(req.params.id)));
}
