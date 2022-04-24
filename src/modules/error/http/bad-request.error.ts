import { Response } from 'express';

export function BadRequestError(res: Response) {
	res.status(400).json({
		status: false,
		data: null,
		error: 'Bad request',
	});
}
