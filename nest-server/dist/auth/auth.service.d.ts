import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(loginDto: LoginDto): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
