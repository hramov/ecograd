/// <reference types="multer" />
import { AttachDto } from './dto/attach.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UploadFileDto, UploadFileForSectionDto } from './dto/upload-file.dto';
import { UploadInquireDto } from './dto/upload-inquire.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    checkChanges(req: Express.Request): Promise<any>;
    uploadFile(req: Express.Request, order_id: number, uploadFileDto: UploadFileDto, files: Array<Express.Multer.File>): Promise<void>;
    uploadFileForSection(req: Express.Request, order_id: number, uploadFileForSectionDto: UploadFileForSectionDto, files: Array<Express.Multer.File>): Promise<{
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
    getAttachesForSection(req: Express.Request, section_id: number): Promise<import("../database/models/order/Attach.model").Attach[]>;
    getOrdersForClient(req: Express.Request): Promise<any>;
    getAppointmentExpert(order_id: number): Promise<any>;
    getOrdersForExpert(req: Express.Request): Promise<any>;
    getExpertForOrder(order_id: number): Promise<any>;
    getSection(section_id: number): Promise<import("../database/models/order/Section.model").Section>;
    uploadInquire(req: Express.Request, dto: UploadInquireDto, order_id: number, files: Array<Express.Multer.File>): Promise<{
        message: string;
    }>;
    getInquire(order_id: number): Promise<import("../database/models/order/Inquire.model").Inquire[]>;
    getSectionsForOrder(order_id: number): Promise<import("../database/models/order/Section.model").Section[]>;
    addOrder(req: Express.Request, dto: CreateOrderDto): Promise<import("../database/models/order/Order.model").Order>;
    getOrder(order_id: number): Promise<any>;
    getOrders(): Promise<any>;
}
