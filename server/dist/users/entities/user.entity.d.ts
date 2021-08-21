import { Model } from 'sequelize-typescript';
interface UserCreationAttrs {
    last_name: string;
    name: string;
    second_name: string;
    email: string;
    password: string;
    roleId: number;
    expertId?: number;
    clientId?: number;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    last_name: string;
    name: string;
    second_name: string;
    email: string;
    password: string;
    roleId: number;
    expertId: number;
    clientId: number;
}
export {};
