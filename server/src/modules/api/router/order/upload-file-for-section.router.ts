import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import path, { extname } from 'path';
import appRoot from 'app-root-path';
import fs from 'fs';
import { Attach } from '../../../database/model/order/Attach.model';
import { Order } from '../../../database/model/order/Order.model';
import { User } from '../../../database/model/user/User.model';
import { Section } from '../../../database/model/order/Section.model';
import { NotFoundError } from '../../../error/http/not-found.error';
import { Logger } from '../../../logger';
import { BadRequestError } from '../../../error/http/bad-request.error';
import { SendSuccessPostReply } from '../../utils/send-success-reply';
import { InternalServerError } from '../../../error/http/internal-server.error';

export async function uploadFileForSection(req: Request, res: Response) {
	const sender = req.user as User;
	if (!req.body.order_id || !req.body.section_id) return BadRequestError(res);

	const order = await Order.findOneBy({
		id: parseInt(req.body.order_id),
	});

	if (!order) {
		return NotFoundError(res, 'order');
	}

	const section = await Section.findOneBy({ id: req.body.section_id });

	if (!section) {
		return NotFoundError(res, 'section');
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
			'public/order_data/' + order.id + '/' + section.arrange,
		);

		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}

		await file.mv(path.resolve(dirPath + '/' + url));
		const attach = Attach.create({
			title: name,
			path:
				'public/order_data/' +
				order.id +
				'/' +
				section.arrange +
				'/' +
				url,
			is_new: true,
			order,
			section,
			sender,
		});
		await attach.save();
		if (sender.profile == '??????????????') {
			section.status = 'taken';
			await section.save();
		}
	} catch (_err) {
		const err = _err as Error;
		Logger.writeError('uploadFileForSection', err.message);
		return InternalServerError(res, err);
	}
	SendSuccessPostReply(res, {
		message: 'Successfully uploaded file!',
	});
}
