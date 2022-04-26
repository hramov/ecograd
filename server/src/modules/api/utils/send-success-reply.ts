import { Response } from 'express';

export function SendSuccessGetReply<T>(
	res: Response,
	data: T,
	message?: string,
) {
	res.status(200).json({
		status: true,
		error: null,
		data,
		message,
	});
}

export function SendSuccessPostReply<T>(
	res: Response,
	data: T,
	message?: string,
) {
	res.status(201).json({
		status: true,
		error: null,
		data,
		message,
	});
}

export function SendSuccessPutReply<T>(
	res: Response,
	data: T,
	message?: string,
) {
	res.status(204).json({
		status: true,
		error: null,
		data,
		message,
	});
}
