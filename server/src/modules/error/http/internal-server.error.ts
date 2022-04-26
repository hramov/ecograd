import { Response } from 'express';

export function InternalServerError(res: Response, error: Error) {
	res.status(500).json({
		status: false,
		data: null,
		error: error.message,
	});
}
