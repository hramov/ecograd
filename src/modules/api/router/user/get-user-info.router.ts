import { Request, Response } from 'express';

export async function getUserInfo(req: Request, res: Response) {
	res.json(req.user);
}
