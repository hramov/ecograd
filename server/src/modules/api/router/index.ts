import { Router } from 'express';
import { userRouter } from './user/user.router';

export class APIRouter {
	private readonly router = Router();

	init() {
		this.router.use('/user', userRouter);
		return this.router;
	}
}
