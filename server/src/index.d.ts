import { Express, Request } from 'express';
import { User } from './modules/database/model/User.model';
declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}
