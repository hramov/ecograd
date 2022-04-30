import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: CreateUserDto): Promise<{
        access_token: string;
    }>;
    info(user: CreateUserDto): Promise<CreateUserDto>;
}
