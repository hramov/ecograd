import { Express, Request } from 'express';
import { User } from './modules/database/model/user/User.model';
declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}
