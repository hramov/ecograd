/// <reference types="multer" />
import { Attach } from 'src/database/models/order/Attach.model';
import { Inquire } from 'src/database/models/order/Inquire.model';
import { Order } from 'src/database/models/order/Order.model';
import { Section } from 'src/database/models/order/Section.model';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AttachDto } from './dto/attach.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UploadFileDto, UploadFileForSectionDto } from './dto/upload-file.dto';
import { UploadInquireDto } from './dto/upload-inquire.dto';
export declare enum OrderTypes {
    'Объект капитального строительства' = 1,
    'Линейный объект' = 2
}
export declare class OrderService {
    uploadInquire(user: CreateUserDto, dto: UploadInquireDto, files: Array<Express.Multer.File>): Promise<{
        message: string;
    }>;
    getInquire(order_id: number): Promise<Inquire[]>;
    addOrder(user_id: number, dto: CreateOrderDto): Promise<Order>;
    getOrderByID(order_id: number): Promise<any>;
    getOrdersWithoutExpert(): Promise<Order[]>;
    getSections(exp_type: number, object_type: number): Promise<{
        code: string | number;
        title: string;
    }[]>;
    private getRiiSectionCode;
    getAttachesForSection(user_id: number, section_id: number): Promise<Attach[]>;
    getOrdersForClient(user_id: number): Promise<any>;
    getOrdersForExpert(user_id: number): Promise<any>;
    getExpertForOrder(order_id: number): Promise<any>;
    checkChanges(sender_id: number): Promise<any>;
    uploadFile(uploadFileDto: UploadFileDto, files: Array<Express.Multer.File>, order_id: number, sender: CreateUserDto): Promise<void>;
    uploadFileForSection(sender: CreateUserDto, files: Array<Express.Multer.File>, dto: UploadFileForSectionDto): Promise<{
        message: string;
    }>;
    appointExpert(order_id: number, expert_id: number): Promise<Order>;
    changeOrderStatus(dto: ChangeOrderStatusDto): Promise<{
        message: string;
    }>;
    setAttachOpened(dto: AttachDto): Promise<Attach>;
    changeSectionStatus(section_id: number, status: string): Promise<{
        message: string;
    }>;
    getSectionByID(section_id: number): Promise<Section>;
    getSectionsForOrder(order_id: number): Promise<Section[]>;
    getOrders(): Promise<any>;
    appointmentExpert(order_id: number): Promise<any>;
}
