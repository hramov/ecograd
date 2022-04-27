import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminDto, ClientDto, ExpertDto } from './dto/profiles.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfiles(): Promise<{
        id: number;
        title: string;
    }[]>;
    getExperts(): Promise<import("../database/models/user/profiles/Expert.model").Expert[]>;
    createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<import("../database/models/user/Feedback.model").Feedback>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    createUser(createUserDto: CreateUserDto, profileDto: AdminDto | ClientDto | ExpertDto): Promise<import("../database/models/user/User.model").User>;
    getUsers(): Promise<import("../database/models/user/profiles/Admin.model").Admin[] | {
        admin: import("../database/models/user/profiles/Admin.model").Admin[];
        expert: import("../database/models/user/profiles/Expert.model").Expert[];
        client: import("../database/models/user/profiles/Client.model").Client[];
    }>;
}
