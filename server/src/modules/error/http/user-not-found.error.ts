import { Response } from 'express';

export async function UserNotFoundError(res: Response) {
	res.status(401).json({
		status: false,
		data: null,
		error: 'User not found',
	});
}
