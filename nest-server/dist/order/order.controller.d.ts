/// <reference types="multer" />
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AttachDto } from './dto/attach.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UploadFileDto, UploadFileForSectionDto } from './dto/upload-file.dto';
import { UploadInquireDto } from './dto/upload-inquire.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    checkChanges(user: CreateUserDto): Promise<any>;
    uploadFile(user: CreateUserDto, order_id: number, uploadFileDto: UploadFileDto, files: Array<Express.Multer.File>): Promise<void>;
    uploadFileForSection(user: CreateUserDto, order_id: number, uploadFileForSectionDto: UploadFileForSectionDto, files: Array<Express.Multer.File>): Promise<{
        message: string;
    }>;
    appointExpert(order_id: number, expert_id: number): Promise<import("../database/models/order/Order.model").Order>;
    changeOrderStatus(dto: ChangeOrderStatusDto): Promise<{
        message: string;
    }>;
    setAttachOpened(dto: AttachDto): Promise<import("../database/models/order/Attach.model").Attach>;
    changeSectionStatus(section_id: number, new_status: string): Promise<{
        message: string;
    }>;
    getOrdersWithoutExpert(): Promise<import("../database/models/order/Order.model").Order[]>;
    getSections(exp_type: number, object_type: number): Promise<{
        code: string | number;
        title: string;
    }[]>;
    getAttachesForSection(user: CreateUserDto, section_id: number): Promise<import("../database/models/order/Attach.model").Attach[]>;
    getOrdersForClient(user: CreateUserDto): Promise<any>;
    getAppointmentExpert(order_id: number): Promise<any>;
    getOrdersForExpert(user: CreateUserDto): Promise<any>;
    getExpertForOrder(order_id: number): Promise<any>;
    getSection(section_id: number): Promise<import("../database/models/order/Section.model").Section>;
    uploadInquire(user: CreateUserDto, dto: UploadInquireDto, order_id: number, files: Array<Express.Multer.File>): Promise<{
        message: string;
    }>;
    getInquire(order_id: number): Promise<import("../database/models/order/Inquire.model").Inquire[]>;
    getSectionsForOrder(order_id: number): Promise<import("../database/models/order/Section.model").Section[]>;
    addOrder(user: CreateUserDto, dto: CreateOrderDto): Promise<import("../database/models/order/Order.model").Order>;
    getOrder(order_id: number): Promise<any>;
    getOrders(): Promise<any>;
}
