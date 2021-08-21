import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.model';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: typeof Role);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findOne(id: number): Promise<Role>;
    findAll(): Promise<Role[]>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: number): Promise<Role>;
}
