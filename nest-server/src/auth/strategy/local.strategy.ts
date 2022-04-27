import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string): Promise<any> {
		const dto: LoginDto = { email, password };
		const user = await this.authService.validateUser(dto);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
