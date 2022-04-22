import express, { Response } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { APP } from '../../config/constant';
import { Logger } from '../logger';
import { autoInjectable } from 'tsyringe';
import { APIRouter } from './router/router';
import passport from 'passport';
import { JWTStrategy } from '../../auth/strategy/jwt.strategy';

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
		passport.use(new JWTStrategy());

		const port = 5005;

		try {
			app.listen(port, () => {
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
