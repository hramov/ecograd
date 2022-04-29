import { Express, Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
declare global {
	namespace Express {
		interface Request {
			user: CreateUserDto;
			params: Express.Request.params;
			body: Express.Request.body;
		}

		interface Response {
			sendFile: Function;
		}
	}
}
