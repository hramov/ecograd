import { NextFunction, Request, Response } from 'express';

export function authenticationMiddleware() {
	return function (req: Request, res: Response, next: NextFunction) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/');
	};
}
