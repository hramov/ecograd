import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: LoginUserDto): Promise<{
        status: boolean;
        jwt_token: string;
        user: import("../users/models/user.model").User;
    }>;
    register(userDto: CreateUserDto): Promise<{
        user: import("../users/models/user.model").User;
        token: string;
    }>;
    validateJwt(req: Request): boolean;
}
