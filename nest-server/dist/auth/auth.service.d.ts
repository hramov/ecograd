import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(loginDto: LoginDto): Promise<any>;
    login(user: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
