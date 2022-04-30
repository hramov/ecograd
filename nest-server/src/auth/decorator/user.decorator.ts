import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export const GetUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.user as CreateUserDto;
	},
);
