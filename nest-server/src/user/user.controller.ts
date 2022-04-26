import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminDto, ClientDto, ExpertDto } from './dto/profiles.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@UseGuards(AdminAuthGuard)
	async getProfiles() {
		return this.userService.getProfiles();
	}

	@Get('expert')
	async getExperts() {
		return await this.userService.getExperts();
	}

	@Post('feedback')
	@UseGuards(JwtAuthGuard)
	async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
		return await this.userService.createFeedback(createFeedbackDto);
	}

	@Delete('/:id')
	@UseGuards(AdminAuthGuard)
	async deleteUser(@Param() id: number) {
		return await this.userService.deleteUser(id);
	}

	@Post('/')
	@UseGuards(AdminAuthGuard)
	async createUser(
		@Body('user') createUserDto: CreateUserDto,
		@Body('profile') profileDto: AdminDto | ClientDto | ExpertDto,
	) {
		return await this.userService.createUser(createUserDto, profileDto);
	}

	@Get('/')
	@UseGuards(AdminAuthGuard)
	async getUsers() {
		return await this.userService.getUsers();
	}
}
