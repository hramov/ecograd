import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: Express.Request): Promise<{
        access_token: string;
    }>;
    info(req: Express.Request): Promise<import("../user/dto/create-user.dto").CreateUserDto>;
}
