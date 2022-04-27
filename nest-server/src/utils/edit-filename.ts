import { path } from 'app-root-path';
import { createHash } from 'crypto';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { extname, resolve } from 'path';

export const editFileName = (
	req: Express.Request,
	file: Express.Multer.File,
	callback: any,
) => {
	const name = file.originalname.split('.')[0];
	const fileExtName = extname(file.originalname);
	const randomName = Array(8)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join('');
	file.filename = `${randomName}-${name}${fileExtName}`;
	callback(null, file.filename);
};

export const getFolderName = (
	req: Express.Request,
	file: Express.Multer.File,
	callback: any,
) => {
	const order_id = req.params.order_id;
	const dirPath = resolve(path, 'public/orders/', order_id, file.fieldname);
	if (!existsSync(dirPath)) {
		mkdirSync(dirPath, { recursive: true });
	}
	callback(null, dirPath);
};
