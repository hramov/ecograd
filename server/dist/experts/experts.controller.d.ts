import { ExpertsService } from './experts.service';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';
export declare class ExpertsController {
    private readonly expertsService;
    constructor(expertsService: ExpertsService);
    create(createExpertDto: CreateExpertDto): Promise<import("./models/expert.model").Expert>;
    findAll(): Promise<import("./models/expert.model").Expert[]>;
    findOne(id: number): Promise<import("./models/expert.model").Expert>;
    update(id: number, updateExpertDto: UpdateExpertDto): Promise<import("./models/expert.model").Expert>;
    remove(id: number): Promise<import("./models/expert.model").Expert>;
    assignExpert(id: number, userid: number): Promise<import("./models/expert.model").Expert>;
}
