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

		this.router.post('/expert', (req: Request, res: Response) =>
			this.commonController.createExpert(req, res),
		);

		this.router.put('/expert', (req: Request, res: Response) =>
			this.commonController.updateExpert(req, res),
		);

		return this.router;
	}
}
