import { Request, Response, Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { CommonController } from '../controller/common.controller';

@autoInjectable()
export class CommonRouter {
	private readonly router;
	constructor(private readonly commonController?: CommonController) {
		this.router = Router();
	}

	init() {
		this.router.get('/expert', (req: Request, res: Response) =>
			this.commonController.getExperts(req, res),
		);

		return this.router;
	}
}
