import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(loginDto: LoginDto): Promise<any> {
		const user = await this.userService.getUserByEmail(loginDto.email);
		if (user && compare(loginDto.password, user.password)) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
		return {
			access_token: this.jwtService.sign({
				sub: user.id,
				profile: user.profile,
			}),
		};
	}
}
