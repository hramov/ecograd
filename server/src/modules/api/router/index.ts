import { Router } from 'express';
import { CommonRouter } from './common.router';
import { UserRouter } from './user.router';

export class APIRouter {
	private readonly router = Router();

	init() {
		this.router.use('/common', new CommonRouter().init());
		this.router.use('/user', new UserRouter().init());

		return this.router;
	}
}
