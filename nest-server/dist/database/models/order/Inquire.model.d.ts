import { Ecograd } from '../Ecograd.model';
import { User } from '../user/User.model';
import { Order } from './Order.model';
export declare class Inquire extends Ecograd {
    title: string;
    path: string;
    order: Order;
    sender: User;
}
