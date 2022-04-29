import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { OverrideGlobalStrategy } from 'src/auth/override-strategy.decorator';
import { ROLES } from 'src/auth/roles';
import { Roles } from 'src/auth/roles.decorator';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminDto, ClientDto, ExpertDto } from './dto/profiles.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Roles(ROLES.Admin)
	async getProfiles() {
		return this.userService.getProfiles();
	}

	@Get('expert')
	@OverrideGlobalStrategy()
	async getExperts() {
		return await this.userService.getExperts();
	}

	@Post('feedback')
	@OverrideGlobalStrategy()
	async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
		return await this.userService.createFeedback(createFeedbackDto);
	}

	@Delete('/:id')
	@Roles(ROLES.Admin)
	async deleteUser(@Param() id: number) {
		return await this.userService.deleteUser(id);
	}

	@Post('/')
	@Roles(ROLES.Admin)
	async createUser(
		@Body('user') createUserDto: CreateUserDto,
		@Body('profile') profileDto: AdminDto | ClientDto | ExpertDto,
	) {
		return await this.userService.createUser(createUserDto, profileDto);
	}

	@Get('/')
	@Roles(ROLES.Admin)
	async getUsers() {
		return await this.userService.getUsers();
	}
}
