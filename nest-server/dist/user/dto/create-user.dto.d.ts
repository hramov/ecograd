import { ROLES } from 'src/auth/roles';
export declare class CreateUserDto {
    id: number;
    name: string;
    email: string;
    password: string;
    profile: ROLES;
}
