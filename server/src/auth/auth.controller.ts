import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles-auth.decorator';
import { RolesEnum } from './roles-enum';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
    return await this.authService.login(userDto);
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-jwt')
  validateJwt(@Req() req: Request) {
    return this.authService.validateJwt(
      req.headers.authorization.split(' ')[1],
    );
  }
}
