import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Request,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ROLES } from 'src/auth/roles';
import { Roles } from 'src/auth/roles.decorator';
import {
	editFileName,
	getFolderName,
	getInquireFolderName,
} from 'src/utils/edit-filename';
import { AttachDto } from './dto/attach.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UploadFileDto, UploadFileForSectionDto } from './dto/upload-file.dto';
import { UploadInquireDto } from './dto/upload-inquire.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get('/check-changes')
	async checkChanges(@Request() req: Express.Request) {
		return await this.orderService.checkChanges(req.user.id);
	}

	@Post('/upload-file/:order_id')
	@UseInterceptors(
		AnyFilesInterceptor({
			storage: diskStorage({
				destination: getFolderName,
				filename: editFileName,
			}),
		}),
	)
	async uploadFile(
		@Request() req: Express.Request,
		@Param('order_id') order_id: number,
		@Body() uploadFileDto: UploadFileDto,
		@UploadedFiles() files: Array<Express.Multer.File>,
	) {
		return await this.orderService.uploadFile(
			uploadFileDto,
			files,
			order_id,
			req.user,
		);
	}

	@Post('/upload-file-for-section/:order_id')
	@UseInterceptors(
		AnyFilesInterceptor({
			storage: diskStorage({
				destination: getFolderName,
				filename: editFileName,
			}),
		}),
	)
	async uploadFileForSection(
		@Request() req: Express.Request,
		@Param('order_id') order_id: number,
		@Body() uploadFileForSectionDto: UploadFileForSectionDto,
		@UploadedFiles() files: Array<Express.Multer.File>,
	) {
		return await this.orderService.uploadFileForSection(
			req.user,
			files,
			uploadFileForSectionDto,
		);
	}

	@Put('/appoint-expert/:order_id')
	@Roles(ROLES.Admin)
	async appointExpert(
		@Param('order_id') order_id: number,
		@Body('expert_id') expert_id: number,
	) {
		return await this.orderService.appointExpert(order_id, expert_id);
	}

	@Put('/change-order-status')
	@Roles(ROLES.Admin)
	async changeOrderStatus(@Body() dto: ChangeOrderStatusDto) {
		return await this.orderService.changeOrderStatus(dto);
	}

	@Put('/set-attach-opened/:attach_id')
	async setAttachOpened(@Body() dto: AttachDto) {
		return await this.orderService.setAttachOpened(dto);
	}

	@Put('/change-section-status/:section_id')
	async changeSectionStatus(
		@Param('section_id') section_id: number,
		@Body('new_status') new_status: string,
	) {
		return await this.orderService.changeSectionStatus(
			section_id,
			new_status,
		);
	}

	@Get('/no-expert')
	@Roles(ROLES.Admin)
	async getOrdersWithoutExpert() {
		return await this.orderService.getOrdersWithoutExpert();
	}

	@Get('/sections-dict/:exp_type/:object_type')
	async getSections(
		@Param('exp_type') exp_type: number,
		@Param('object_type') object_type: number,
	) {
		return await this.orderService.getSections(exp_type, object_type);
	}

	@Get('/attaches-for-section/:section_id')
	async getAttachesForSection(
		@Request() req: Express.Request,
		@Param('section_id') section_id: number,
	) {
		return await this.orderService.getAttachesForSection(
			req.user.id,
			section_id,
		);
	}

	@Get('/client')
	@Roles(ROLES.Client)
	async getOrdersForClient(@Request() req: Express.Request) {
		return await this.orderService.getOrdersForClient(req.user.id);
	}

	@Get('/expert/:order_id')
	@Roles(ROLES.Admin)
	async getAppointmentExpert(@Param('order_id') order_id: number) {
		return await this.orderService.appointmentExpert(order_id);
	}

	@Get('/expert')
	@Roles(ROLES.Expert)
	async getOrdersForExpert(@Request() req: Express.Request) {
		return await this.orderService.getOrdersForExpert(req.user.id);
	}

	@Get('/expert-for-order/:order_id')
	async getExpertForOrder(@Param('order_id') order_id: number) {
		return await this.orderService.getExpertForOrder(order_id);
	}

	@Get('/section/:section_id')
	async getSection(@Param('section_id') section_id: number) {
		return await this.orderService.getSectionByID(section_id);
	}

	@Post('/upload-inquire/:order_id')
	@UseInterceptors(
		AnyFilesInterceptor({
			storage: diskStorage({
				destination: getInquireFolderName,
				filename: editFileName,
			}),
		}),
	)
	async uploadInquire(
		@Request() req: Express.Request,
		@Body() dto: UploadInquireDto,
		@Param('order_id') order_id: number,
		@UploadedFiles() files: Array<Express.Multer.File>,
	) {
		return await this.orderService.uploadInquire(req.user, dto, files);
	}

	@Get('/inquire/:order_id')
	async getInquire(@Param('order_id') order_id: number) {
		return await this.orderService.getInquire(order_id);
	}

	@Get('/sections/:order_id')
	async getSectionsForOrder(@Param('order_id') order_id: number) {
		return await this.orderService.getSectionsForOrder(order_id);
	}

	@Post('/')
	@Roles(ROLES.Client)
	async addOrder(
		@Request() req: Express.Request,
		@Body() dto: CreateOrderDto,
	) {
		return await this.orderService.addOrder(req.user.id, dto);
	}

	@Get('/:order_id')
	async getOrder(@Param('order_id') order_id: number) {
		return await this.orderService.getOrderByID(order_id);
	}

	@Get('/')
	@Roles(ROLES.Admin)
	async getOrders() {
		return await this.orderService.getOrders();
	}
}
