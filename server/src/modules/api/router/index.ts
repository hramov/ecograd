import { Router } from 'express';
import { CommonRouter } from './common.router';

export class APIRouter {
	private readonly router = Router();

	init() {
		this.router.use('/common', new CommonRouter().init());

		return this.router;
	}
}
