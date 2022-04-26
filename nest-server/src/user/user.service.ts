import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { ROLES } from 'src/auth/roles';
import { Feedback } from 'src/database/models/user/Feedback.model';
import { Admin } from 'src/database/models/user/profiles/Admin.model';
import { Client } from 'src/database/models/user/profiles/Client.model';
import { Expert } from 'src/database/models/user/profiles/Expert.model';
import { User } from 'src/database/models/user/User.model';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminDto, ClientDto, ExpertDto } from './dto/profiles.dto';

export interface IUser {}

@Injectable()
export class UserService {
	constructor() {}

	async getUserByID(user_id: number) {
		return await User.findOne(user_id);
	}

	async getUserByEmail(email: string) {
		return await User.findOne({ where: { email: email } });
	}

	async createUser(
		createUserDto: CreateUserDto,
		profileDto: AdminDto | ExpertDto | ClientDto,
	) {
		const result = User.create({
			name: createUserDto.name,
			email: createUserDto.email,
			password: hashSync(createUserDto.password, 10),
			profile: createUserDto.profile,
		});
		const savedUser = await result.save();

		let error = null;

		switch (createUserDto.profile) {
			case ROLES.Admin:
				const admin = Admin.create({
					user: savedUser,
				});
				await admin.save();
				break;
			case ROLES.Expert:
				const expertDto = profileDto as ExpertDto;
				const expert = Expert.create({
					certificate: expertDto.certificate,
					direction: expertDto.direction,
					misc: expertDto.misc,
					position: expertDto.position,
					phone: expertDto.phone,
					user: savedUser,
				});
				await expert.save();
				break;
			case ROLES.Client:
				const clientDto = profileDto as ClientDto;
				const client = Client.create({
					phone: clientDto.phone,
					user: savedUser,
				});
				await client.save();
				break;
			default:
				error = new Error('Профиль не опознан');
		}

		return result;
	}

	async deleteUser(user_id: number) {
		return await User.delete(user_id);
	}

	getProfiles() {
		return [
			{
				id: 1,
				title: 'Администратор',
			},
			{
				id: 2,
				title: 'Эксперт',
			},
			{
				id: 3,
				title: 'Клиент',
			},
		];
	}

	async getUsers(profile?: string) {
		if (profile) {
			switch (profile) {
				case ROLES.Admin:
					return await Admin.find({
						relations: ['user'],
					});
				case ROLES.Client:
					return await Client.find({
						relations: ['user'],
					});
				case ROLES.Expert:
					return await Expert.find({
						relations: ['user'],
					});
			}
		}

		return {
			admin: await Admin.find({ relations: ['user'] }),
			expert: await Expert.find({ relations: ['user'] }),
			client: await Client.find({ relations: ['user'] }),
		};
	}

	async getExperts() {
		return await Expert.find({ relations: ['user'] });
	}

	async createFeedback(createFeedbackDto: CreateFeedbackDto) {
		const feedback = Feedback.create({
			name: createFeedbackDto.name,
			email: createFeedbackDto.email,
			feedback: createFeedbackDto.feedback,
		});
		return await feedback.save();
	}
}
