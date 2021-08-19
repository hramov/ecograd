import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { hash, compare } from 'bcryptjs';
import { User } from 'src/users/models/user.model';
import { RolesEnum } from './roles-enum';

interface VerifyJwt {
  id: number;
  email: string;
  roles: Array<any>;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userLoginDto: LoginUserDto) {
    const user = await this.validateUser(userLoginDto);
    return {
      status: true,
      jwt_token: this.generateToken(user),
      user: user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findByEmail(createUserDto.email);

    if (candidate) {
      throw new BadRequestException('This email has already been registered!');
    }

    const hashedPassword = await hash(createUserDto.password, 5);

    let user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
      birth_date: new Date(createUserDto.birth_date),
    });

    // user = await this.userService.addRole({
    //   roleid: 1,
    //   userid: user.id,
    // });

    return {
      user: user,
      token: this.generateToken(user),
    };
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.findByEmail(userDto.email);
    if (user) {
      const passwordEquals = await compare(userDto.password, user.password);
      if (passwordEquals) return user;
    }

    throw new UnauthorizedException('Incorrect credentials');
  }

  validateJwt(jwt_token: string) {
    try {
      const user: VerifyJwt = this.jwtService.verify(jwt_token);
      const admin = user.roles.some((role) => role.id == RolesEnum.Admin);
      if (admin) {
        return true;
      }
      return false;
    } catch (err) {
      throw new BadRequestException('JWT is not valid!');
    }
  }
}
