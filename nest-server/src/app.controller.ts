import { Controller, Get, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { resolve } from 'path';
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/public/*')
	downloadFile(
		@Request() req: Express.Request,
		@Response() res: Express.Response,
	) {
		const filePath = req.params[0];
		res.sendFile(resolve(__dirname, '../public', filePath));
	}
}
