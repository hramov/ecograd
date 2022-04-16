import { Repository } from 'typeorm';
import { UserNotFoundError } from '../../error/app/user-not-found.error';
import { AppDataSource } from '../data-source';
import { User } from '../model/user/User.model';
import { hashSync, compareSync } from 'bcrypt';
import { ROLES } from '../../../entity/auth/config';
import { Expert } from '../model/user/Expert.model';
import { Client } from '../model/user/Client.model';
import { Admin } from '../model/user/Admin.model';
import { Profile } from '../model/user/Profile.model';
import { UserDto } from '../../../entity/auth/dto/user.dto';
import { AdminDto } from '../../../entity/auth/dto/admin.dto';
import { ClientDto } from '../../../entity/auth/dto/client.dto';
import { ExpertDto } from '../../../entity/auth/dto/expert.dto';
export class UserAccess {
	private repository: Repository<User>;
	private expertRepo: Repository<Expert>;
	private clientRepo: Repository<Client>;
	private adminRepo: Repository<Admin>;
	private profileRepo: Repository<Profile>;

	constructor() {
		this.repository = AppDataSource.getRepository(User);
		this.expertRepo = AppDataSource.getRepository(Expert);
		this.clientRepo = AppDataSource.getRepository(Client);
		this.adminRepo = AppDataSource.getRepository(Admin);
		this.profileRepo = AppDataSource.getRepository(Profile);
	}

	public async getAllUsers() {
		return await this.repository.find({ relations: ['profile'] });
	}

	public async getUserByEmailAndPassword(
		email: string,
		password: string,
	): Promise<User | UserNotFoundError> {
		const user = await this.repository.findOneBy({
			email: email,
		});
		return user;
		if (user && this.checkPassword(password, user.password)) {
			return user;
		}
		return null;
	}

	public async checkIfUserExistsByEmail(email: string): Promise<boolean> {
		const user = await this.repository.findOne({
			where: {
				email: email,
			},
			relations: ['profile'],
		});
		return !!user;
	}

	public async getUserByID(id: number): Promise<User | UserNotFoundError> {
		return await this.repository.findOne({
			where: {
				id: id,
			},
			relations: ['profile', 'expert', 'admin', 'client'],
		});
	}

	public async create(
		dto: UserDto,
		profileDto: AdminDto | ClientDto | ExpertDto,
	): Promise<User | Error> {
		dto.password = this.createHash(dto.password);

		const user = new User();
		user.name = dto.name;
		user.email = dto.email;
		user.password = this.createHash(dto.password);

		const profiles = await this.profileRepo.find();
		user.profile = profiles.find(
			(profile: Profile) => dto.profile === profile.title,
		);

		switch (dto.profile) {
			case ROLES.Admin:
				const admin = new Admin();
				await this.adminRepo.save(admin);
				user.admin = admin;
				await this.repository.save(user);
				break;
			case ROLES.Expert:
				const expert = new Expert();
				expert.phone = (profileDto as ExpertDto).phone;
				expert.position = (profileDto as ExpertDto).position;
				expert.certificate = (profileDto as ExpertDto).certificate;
				expert.direction = (profileDto as ExpertDto).direction;
				await this.expertRepo.save(expert);
				user.expert = expert;
				await this.repository.save(user);
				break;
			case ROLES.Client:
				const client = new Client();
				client.phone = (profileDto as ClientDto).phone;
				await this.clientRepo.save(client);
				user.client = client;
				await this.repository.save(user);
				break;
			default:
				return new Error('Профиль не опознан');
		}
		return user;
	}

	public async save(user: User): Promise<User> {
		user.password = this.createHash(user.password);
		return await this.repository.save(user);
	}

	public async userCount() {
		return await this.repository.count();
	}

	private createHash(password: string) {
		return hashSync(password, 10);
	}

	private checkPassword(password: string, passwordHash: string) {
		return compareSync(password, passwordHash);
	}
}
