import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { APP } from '../../config/constant';
import { Logger } from '../logger';

export class API {
	constructor(private readonly logger?: Logger) {}

	public async start(instance: any) {
		const app = express();
		app.disable('x-powered-by');

		app.use(express.json({ limit: '10mb' }));
		app.use(express.urlencoded({ extended: false }));

		app.use(fileUpload());

		app.use(
			cors({
				allowedHeaders: [
					'sessionId',
					'Content-Type',
					'X-Auth-Token',
					'X-Gui-Version',
				],
				exposedHeaders: ['sessionId'],
				origin: '*',
				methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
				preflightContinue: false,
			}),
		);

		// const router = new ApiRouter();

		// app.use('/api', router.init());

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
