import express, { Response } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { Logger } from '../logger';
import { APIRouter } from './router/router';
import passport from 'passport';
import { JWTStrategy } from '../../auth/strategy/jwt.strategy';
import { readFileSync } from 'fs';
import appRoot from 'app-root-path';

import https from 'https';
import path from 'path';
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

			if (process.env.START_TYPE == 'prod') {
				https
					.createServer(
						{
							key: privateKey,
							cert: certificate,
						},
						app,
					)
					.listen(port, () => {
						Logger.writeInfo(
							'App started in PROD mode, listening on port ' +
								port,
						);
					});
			} else if (process.env.START_TYPE == 'dev') {
				app.listen(port, () => {
					Logger.writeInfo(
						'App started in DEV mode, listening on port ' + port,
					);
				});
			} else {
				throw new Error('Unknown start type');
			}
		} catch (_err) {
			const err = _err as Error;
			Logger.writeError('start', err.message);
		}
	}
}
