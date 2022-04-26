import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req: any) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('info')
	async info(@Request() req: any) {
		return req.user;
	}
}
