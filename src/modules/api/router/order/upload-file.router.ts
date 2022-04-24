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

export async function uploadFile(req: Request, res: Response) {
	const sender = req.user as User;

	if (!req.params.order_id || Object.keys(req.body).length == 0)
		return BadRequestError(res);

	const order = await Order.findOneBy({
		id: parseInt(req.params.order_id),
	});

	if (!order) {
		return NotFoundError(res, 'order');
	}

	const fileNames = Object.keys(req.files);
	const sectionNames = Object.keys(req.body);

	const sectionsWithoutFiles = sectionNames.filter(
		(sectionName: string) => !fileNames.includes(sectionName),
	);

	for (const section of sectionsWithoutFiles) {
		const sec = Section.create({
			arrange: section,
			title: req.body[section],
			status: 'new',
			order: order,
			parent: false,
		});
		await sec.save();
	}

	for (let i = 0; i < fileNames.length; i++) {
		const section = Section.create({
			arrange: fileNames[i],
			title: req.body[fileNames[i]],
			status: 'new',
			order: order,
		});
		await section.save();

		try {
			const file = req.files[fileNames[i]] as fileUpload.UploadedFile;
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
		} catch (_err) {
			const err = _err as Error;
			Logger.writeError(err.message);
			return res.json({
				message: err,
			});
		}
	}
	res.json({
		message: 'Successfully uploaded ' + fileNames.length + ' files!',
	});
}
