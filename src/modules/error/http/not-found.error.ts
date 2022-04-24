import { Response } from 'express';

export async function NotFoundError(
	res: Response,
	entity: string,
	message?: string,
) {
	res.status(404).json({
		status: false,
		data: null,
		error: message ? message : `${entity} not found`,
	});
}
