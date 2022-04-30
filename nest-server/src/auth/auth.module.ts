import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({})
export class AuthModule {
	static forRoot(secret: string, expiresIn: string): DynamicModule {
		return {
			module: AuthModule,
			imports: [
				UserModule,
				PassportModule,
				JwtModule.register({
					secret,
					signOptions: { expiresIn },
				}),
			],
			controllers: [AuthController],
			providers: [AuthService, LocalStrategy, JwtStrategy],
		};
	}
}
