import { Response } from 'express';

export async function NoCredentialsError(res: Response) {
	res.status(401).json({
		status: false,
		data: null,
		error: 'No credentials passed',
	});
}
