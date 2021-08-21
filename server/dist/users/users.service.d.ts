/// <reference types="multer" />
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UserRole } from './models/user-role.model';
export declare class UsersService {
    private userRepository;
    private userRoleRepository;
    private rolesService;
    private readonly logger;
    constructor(userRepository: typeof User, userRoleRepository: typeof UserRole, rolesService: RolesService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByPhone(phone: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
    addRole(dto: AddRoleDto): Promise<User>;
    removeRole(dto: AddRoleDto): Promise<import("../roles/models/role.model").Role[] | "User or role not found" | "User does not has this role">;
    findUsersForExperts(): Promise<any[]>;
    findUExperts(): Promise<any[]>;
    appendImage(id: number, file: Express.Multer.File): Promise<User | "No file">;
}
