import { Ecograd } from '../Ecograd.model';
import { User } from '../user/User.model';
import { Order } from './Order.model';
import { Section } from './Section.model';
export declare class Attach extends Ecograd {
    title: string;
    path: string;
    is_new: boolean;
    order: Order;
    section: Section;
    sender: User;
}
