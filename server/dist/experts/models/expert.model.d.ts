import { Model } from 'sequelize-typescript';
import { Order } from 'src/orders/models/order.model';
import { User } from 'src/users/models/user.model';
interface ExpertCreationAttrs {
    position: string;
    cert: string;
    direction: string;
    misc?: string;
}
export declare class Expert extends Model<Expert, ExpertCreationAttrs> {
    id: number;
    position: string;
    cert: string;
    direction: string;
    misc: string;
    image_url: string;
    orders: Order[];
    userid: number;
    user: User;
}
export {};
