import { Request, Response } from 'express';

export async function getProfiles(req: Request, res: Response) {
	res.json({
		profile: ['Администратор', 'Эксперт', 'Клиент'],
	});
}
