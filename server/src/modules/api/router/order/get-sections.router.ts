import { Request, Response } from 'express';
import { NotFoundError } from '../../../error/http/not-found.error';

export enum OrderTypes {
	'Линейный объект' = 1,
	'Объект капитального строительства' = 2,
}

export function getSections(req: Request, res: Response) {
	const type = parseInt(req.params.type as string);
	if (type == 1) {
		return [
			{ 1: '' },
			{ 2: '' },
			{ 3: '' },
			{ 4: '' },
			{ 5: '' },
			{ 6: '' },
			{ 7: '' },
			{ 8: '' },
			{ 9: '' },
			{ 10: '' },
			{ 11: '' },
			{ 12: '' },
		];
	} else if (type == 2) {
		return [
			{ 1: '' },
			{ 2: '' },
			{ 3: '' },
			{ 4: '' },
			{ 5: '' },
			{ 6: '' },
			{ 7: '' },
			{ 8: '' },
			{ 9: '' },
			{ 10: '' },
			{ 11: '' },
			{ 12: '' },
		];
	} else {
		return NotFoundError(res, 'order_type');
	}
}
