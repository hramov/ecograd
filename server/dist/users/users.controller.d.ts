/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./models/user.model").User>;
    findAll(): Promise<import("./models/user.model").User[]>;
    findUsersForExperts(): Promise<any[]>;
    findUExperts(): Promise<any[]>;
    addRole(dto: AddRoleDto): Promise<import("./models/user.model").User>;
    removeRole(dto: AddRoleDto): Promise<import("../roles/models/role.model").Role[] | "User or role not found" | "User does not has this role">;
    findOne(req: Request, id: number): Promise<import("./models/user.model").User>;
    update(req: Request, id: number, updateUserDto: UpdateUserDto): Promise<import("./models/user.model").User>;
    remove(req: Request, id: number): Promise<import("./models/user.model").User>;
    appendImage(id: number, file: Express.Multer.File): Promise<import("./models/user.model").User | "No file">;
}
