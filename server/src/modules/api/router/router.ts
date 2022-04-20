import { Router } from 'express';
import { orderRouter } from './order/order.router';
import { userRouter } from './user/user.router';

export class APIRouter {
	private readonly router = Router();

	init() {
		this.router.use('/user', userRouter);
		this.router.use('/order', orderRouter);
		return this.router;
	}
}
