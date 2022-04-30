import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { OverrideGlobalStrategy } from './override-strategy.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@OverrideGlobalStrategy()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@GetUser() user: CreateUserDto) {
		return this.authService.login(user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('info')
	async info(@GetUser() user: CreateUserDto) {
		return user;
	}
}
