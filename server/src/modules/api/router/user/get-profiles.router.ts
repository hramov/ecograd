import { Request, Response } from 'express';
import { SendSuccessGetReply } from '../../utils/send-success-reply';

export async function getProfiles(req: Request, res: Response) {
	SendSuccessGetReply(res, [
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
