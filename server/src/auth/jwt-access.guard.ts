import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const bearer = req.headers.authorization.split(' ')[0];
      const token = req.headers.authorization.split(' ')[1];
      const userid = req.params.id;

      if (bearer != 'Bearer' || !token)
        throw new UnauthorizedException('Unauthorized');
      if (!this.authService.validateJwt(token))
        throw new UnauthorizedException('Unauthorized');

      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
