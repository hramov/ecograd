import appRoot from 'app-root-path';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { readFileSync } from 'fs';
import https from 'https';
import passport from 'passport';
import path from 'path';

import { JWTStrategy } from '../../auth/strategy/jwt.strategy';
import { Logger } from '../logger';
import { APIRouter } from './router/router';

export class APIReply<T> {
	public status: boolean;
	public data: T;
	public error: string | null;
}

export async function SuccessAPIReply<T>(res: Response, data: T) {
	res.status(200).json({
		status: true,
		error: null,
		data: data,
	});
}

export class API {
	constructor() {}

	public async start() {
		const app = express();
		app.disable('x-powered-by');

		app.use(express.json({ limit: '10mb' }));
		app.use(express.urlencoded({ extended: false }));
		app.use(passport.initialize());
		app.use(fileUpload());
		app.use(
			(err: Error, req: Request, res: Response, next: NextFunction) => {
				Logger.writeError(err.message);
				res.status(500).json({
					message: 'Something went wrong',
				});
			},
		);
		app.use(cors());
		app.use('/api/public', express.static('public'));

		const router = new APIRouter();

		app.use('/api', router.init());

		app.use(express.static('app'));

		app.get(/.*/, (req, res) => {
			res.sendFile(path.resolve(appRoot.path, 'app/index.html'));
		});

		passport.use(new JWTStrategy());

		const port = 5005;

		try {
			const certificate = readFileSync(
				path.resolve(appRoot.path, 'data/cert/fullchain.pem'),
			);
			const privateKey = readFileSync(
				path.resolve(appRoot.path, 'data/cert/privkey.pem'),
			);

			https
				.createServer(
					{
						key: privateKey,
						cert: certificate,
					},
					app,
				)
				.listen(port, () => {
					let proc = require('process');
					Logger.writeInfo(
						'app listening on port ' +
							port +
							', ' +
							'node: ' +
							proc.version,
					);
				});
		} catch (_err) {
			const err = _err as Error;
			Logger.writeError(err.message);
		}
	}
}
