import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/models/user.model';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userLoginDto: LoginUserDto): Promise<{
        status: boolean;
        jwt_token: string;
        user: User;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        user: User;
        token: string;
    }>;
    private generateToken;
    private validateUser;
    validateJwt(jwt_token: string): boolean;
}
