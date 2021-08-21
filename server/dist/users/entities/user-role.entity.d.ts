import { Model } from 'sequelize-typescript';
export declare class UserRole extends Model<UserRole> {
    id: number;
    userId: number;
    roleId: number;
}
