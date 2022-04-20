import { Request, Response } from 'express';

export async function getProfiles(req: Request, res: Response) {
	res.json([
		{
			id: 1,
			title: 'Администратор',
		},
		{
			id: 2,
			title: 'Эксперт',
		},
		{
			id: 3,
			title: 'Клиент',
		},
	]);
}
