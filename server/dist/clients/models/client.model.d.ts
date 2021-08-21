import { Model } from 'sequelize-typescript';
import { Order } from 'src/orders/models/order.model';
import { User } from 'src/users/models/user.model';
interface ClientCreationAttrs {
    orders_count: number;
}
export declare class Client extends Model<Client, ClientCreationAttrs> {
    id: number;
    orders_count: number;
    orders: Order[];
    userid: number;
    user: User;
}
export {};
