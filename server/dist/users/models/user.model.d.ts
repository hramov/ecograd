import { Model } from 'sequelize-typescript';
import { Expert } from 'src/experts/models/expert.model';
import { Order } from 'src/orders/models/order.model';
import { Role } from 'src/roles/models/role.model';
interface UserCreationAttrs {
    last_name?: string;
    name: string;
    second_name?: string;
    phone: string;
    birth_date?: Date;
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    last_name: string;
    name: string;
    second_name: string;
    phone: string;
    birth_date: Date;
    email: string;
    password: string;
    image_url: string;
    orders: Order[];
    roles: Role[];
    expert: Expert;
}
export {};
