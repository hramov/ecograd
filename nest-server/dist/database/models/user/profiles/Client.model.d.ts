import { Order } from '../../order/Order.model';
import { Profile } from './Profile.model';
export declare class Client extends Profile {
    phone: string;
    orders: Order[];
}
