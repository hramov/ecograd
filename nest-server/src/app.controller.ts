import { Controller, Get, Request, Response } from '@nestjs/common';
import { resolve } from 'path';
@Controller()
export class AppController {
	@Get('/public/*')
	downloadFile(
		@Request() req: Express.Request,
		@Response() res: Express.Response,
	) {
		const filePath = req.params[0];
		res.sendFile(resolve(__dirname, '../public', filePath));
	}
}
