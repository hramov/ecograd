import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/add-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): any;
    findOne(id: string): any;
    findAll(): any;
    update(id: string, updateRoleDto: UpdateRoleDto): any;
    remove(id: string): any;
}
