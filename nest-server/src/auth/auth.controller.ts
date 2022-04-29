import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { OverrideGlobalStrategy } from './override-strategy.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@OverrideGlobalStrategy()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req: Express.Request) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('info')
	async info(@Request() req: Express.Request) {
		return req.user;
	}
}
