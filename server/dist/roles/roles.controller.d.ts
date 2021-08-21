import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("./models/role.model").Role>;
    findOne(id: number): Promise<import("./models/role.model").Role>;
    findAll(): Promise<import("./models/role.model").Role[]>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<import("./models/role.model").Role>;
    remove(id: number): Promise<import("./models/role.model").Role>;
}
