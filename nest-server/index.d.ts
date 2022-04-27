import { Express, Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
declare global {
	namespace Express {
		interface Request {
			user: CreateUserDto;
			params: any;
			body: any;
		}
	}
}
