import express, { Response } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { APP } from '../../config/constant';
import { Logger } from '../logger';
import { autoInjectable } from 'tsyringe';
import { APIRouter } from './router';

export class APIReply<T> {
	public status: boolean;
	public data: T;
	public error: string | null;
}

export async function SuccessAPIReply<T>(res: Response, data: APIReply<T>) {
	res.status(200).json(data);
}
@autoInjectable()
export class API {
	constructor(private readonly logger?: Logger) {}

	public async start() {
		const app = express();
		app.disable('x-powered-by');

		app.use(express.json({ limit: '10mb' }));
		app.use(express.urlencoded({ extended: false }));

		app.use(fileUpload());

		app.use(cors());

		const router = new APIRouter();

		app.use('/api', router.init());

		// const authMiddleware = new AuthMiddleware();
		// app.use((req: Request, res: Response, next: NextFunction) =>
		// 	authMiddleware.canActivate(req, res, next),
		// );

		const port = Number(process.env.MTNK_APP_PORT) || APP.defaultPort;

		try {
			app.listen(port, () => {
				let proc = require('process');
				this.logger.writeInfo(
					'app listening on port ' +
						port +
						', ' +
						'node: ' +
						proc.version,
				);
			});
		} catch (_err) {
			const err = _err as Error;
			this.logger.writeError(err.message);
		}
	}
}
