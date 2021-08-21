import { UsersService } from 'src/users/users.service';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';
import { Expert } from './models/expert.model';
export declare class ExpertsService {
    private expertRepository;
    private userService;
    constructor(expertRepository: typeof Expert, userService: UsersService);
    create(createExpertDto: CreateExpertDto): Promise<Expert>;
    findAll(): Promise<Expert[]>;
    findOne(id: number): Promise<Expert>;
    update(id: number, updateExpertDto: UpdateExpertDto): Promise<Expert>;
    remove(id: number): Promise<Expert>;
    assignToExpert(id: number, userid: number): Promise<Expert>;
}
