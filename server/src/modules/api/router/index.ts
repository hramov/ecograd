import { Router } from 'express';
import { CommonRouter } from './common.router';
import { OrderRouter } from './order.router';
import { UserRouter } from './user.router';

export class APIRouter {
	private readonly router = Router();

	init() {
		this.router.use('/common', new CommonRouter().init());
		this.router.use('/user', new UserRouter().init());
		this.router.use('/order', new OrderRouter().init());
		return this.router;
	}
}
