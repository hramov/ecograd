import { Feedback } from 'src/database/models/user/Feedback.model';
import { Admin } from 'src/database/models/user/profiles/Admin.model';
import { Client } from 'src/database/models/user/profiles/Client.model';
import { Expert } from 'src/database/models/user/profiles/Expert.model';
import { User } from 'src/database/models/user/User.model';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminDto, ClientDto, ExpertDto } from './dto/profiles.dto';
export interface IUser {
}
export declare class UserService {
    getUserByID(user_id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(createUserDto: CreateUserDto, profileDto: AdminDto | ExpertDto | ClientDto): Promise<User>;
    deleteUser(user_id: number): Promise<import("typeorm").DeleteResult>;
    getProfiles(): {
        id: number;
        title: string;
    }[];
    getUsers(profile?: string): Promise<Admin[] | {
        admin: Admin[];
        expert: Expert[];
        client: Client[];
    }>;
    getExperts(): Promise<Expert[]>;
    createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback>;
}
