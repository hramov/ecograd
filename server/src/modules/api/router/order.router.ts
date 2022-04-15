import { Request, Response, Router } from 'express';
import passport from 'passport';
import { autoInjectable } from 'tsyringe';
import { JWTStrategy } from '../../../entity/auth/strategy/jwt.strategy';
import { OrderController } from '../controller/order.controller';

@autoInjectable()
export class OrderRouter {
	private readonly router;
	constructor(private readonly orderController?: OrderController) {
		this.router = Router();
	}
	init() {
		this.router.get(
			'/',
			passport.authenticate(new JWTStrategy(), { session: false }),
			(req: Request, res: Response) =>
				this.orderController.getOrders(req, res),
		);

		return this.router;
	}
}
