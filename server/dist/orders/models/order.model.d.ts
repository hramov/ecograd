import { Model } from 'sequelize-typescript';
import { Expert } from 'src/experts/models/expert.model';
import { User } from 'src/users/models/user.model';
interface OrderCreationAttrs {
    object: string;
    object_type: 1 | 2;
    isDocs?: boolean;
    docsUrl?: string;
    status?: 'new' | 'inWork' | 'done';
}
export declare class Order extends Model<Order, OrderCreationAttrs> {
    id: number;
    object: string;
    object_type: 1 | 2;
    isDocs: boolean;
    docs_url: string;
    status: 'new' | 'inWork' | 'done';
    clientid: number;
    client: User;
    expertid: number;
    expert: Expert;
}
export {};
