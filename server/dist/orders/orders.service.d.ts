/// <reference types="multer" />
import { AuthService } from 'src/auth/auth.service';
import { ExpertsService } from 'src/experts/experts.service';
import { UsersService } from 'src/users/users.service';
import { CreateOrderUnauthorizedDto } from './dto/create-order-unauthorized.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './models/order.model';
export declare class OrdersService {
    private orderRepository;
    private expertService;
    private userService;
    private authService;
    constructor(orderRepository: typeof Order, expertService: ExpertsService, userService: UsersService, authService: AuthService);
    create(createOrderDto: CreateOrderDto): Promise<Order | "You should be a client to make orders">;
    createOrderUnauthorized(orderDto: CreateOrderUnauthorizedDto): Promise<"Something went wrong" | {
        order: Order;
        user: import("../users/models/user.model").User;
    }>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: number): Promise<Order>;
    addExpert(id: number, expertid: number): Promise<Order | "Order already has an expert">;
    findByClientId(clientid: number): Promise<Order[]>;
    uploadDocs(id: number, files: Array<Express.Multer.File>): Promise<boolean>;
}
