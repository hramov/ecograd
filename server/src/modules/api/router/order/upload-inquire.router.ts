import appRoot from 'app-root-path';
import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { existsSync, mkdirSync } from 'fs';
import path, { extname } from 'path';
import { Inquire } from '../../../database/model/order/Inquire.model';
import { Order } from '../../../database/model/order/Order.model';
import { User } from '../../../database/model/user/User.model';
import { BadRequestError } from '../../../error/http/bad-request.error';
import { InternalServerError } from '../../../error/http/internal-server.error';
import { NotFoundError } from '../../../error/http/not-found.error';
import { Logger } from '../../../logger';
import { SendSuccessPostReply } from '../../utils/send-success-reply';

export async function uploadInquire(req: Request, res: Response) {
	const sender = req.user as User;

	if (!req.body.order_id) return BadRequestError(res);

	const order = await Order.findOneBy({
		id: parseInt(req.body.order_id),
	});

	if (!order) {
		return NotFoundError(res, 'order');
	}

	const fileNames = Object.keys(req.files);
	if (fileNames.length == 0) return BadRequestError(res);

	try {
		const file = req.files[fileNames[0]] as fileUpload.UploadedFile;
		const name = file.name;
		const size = file.data.length;
		const md5 = file.md5;
		if (size > 10_000_000_000) {
			throw 'File size overflow';
		}
		const url = md5 + '_' + Date.now() + extname(name);
		const dirPath = path.resolve(
			appRoot.path,
			'public/order_data/' + order.id + '/inquires',
		);

		if (!existsSync(dirPath)) {
			mkdirSync(dirPath, { recursive: true });
		}

		await file.mv(path.resolve(dirPath + '/' + url));

		const inquire = Inquire.create({
			title: name,
			path: 'public/order_data/' + order.id + '/inquires/' + url,
			order,
			sender,
		});
		await inquire.save();
		Logger.writeInfo(
			'Successfully upload inquire for order ' + req.body.order_id,
		);
	} catch (_err) {
		const err = _err as Error;
		Logger.writeError('uploadInquire', err.message);
		return InternalServerError(res, err);
	}
	SendSuccessPostReply(res, {
		message: 'Successfully uploaded file!',
	});
}
