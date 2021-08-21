/// <reference types="multer" />
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderUnauthorizedDto } from './dto/create-order-unauthorized.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("./models/order.model").Order | "You should be a client to make orders">;
    createOrderUnauthorized(orderDto: CreateOrderUnauthorizedDto): Promise<"Something went wrong" | {
        order: import("./models/order.model").Order;
        user: import("../users/models/user.model").User;
    }>;
    findAll(): Promise<import("./models/order.model").Order[]>;
    findOne(id: number): Promise<import("./models/order.model").Order>;
    findByClientId(clientid: number): Promise<import("./models/order.model").Order[]>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<import("./models/order.model").Order>;
    remove(id: number): Promise<import("./models/order.model").Order>;
    addExpert(id: number, expertid: number): Promise<import("./models/order.model").Order | "Order already has an expert">;
    uploadDocs(id: number, files: Array<Express.Multer.File>): Promise<boolean>;
}
