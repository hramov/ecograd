import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	public async canActivate(context: ExecutionContext) {
		const override = this.reflector.get<boolean | undefined>(
			'override-global-strategy',
			context.getHandler(),
		);
		if (override) {
			return true;
		}

		return super.canActivate(context) as boolean;
	}
}
