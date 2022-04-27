import { Ecograd } from '../Ecograd.model';
import { Attach } from './Attach.model';
import { Order } from './Order.model';
export declare class Section extends Ecograd {
    arrange: string;
    title: string;
    status: string;
    parent: boolean;
    order: Order;
    attach: Attach[];
}
