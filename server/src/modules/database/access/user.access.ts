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
		const users = await this.repository.find({ relations: ['profile'] });

		for (let i = 0; i < users.length; i++) {
			users[i].admin = (
				await this.adminRepo.query(
					`select * from "user"."admin" where "userId" = ${users[i].id}`,
				)
			)[0];
			users[i].expert = (
				await this.expertRepo.query(
					`select * from "user"."expert" where "userId" = ${users[i].id}`,
				)
			)[0];
			users[i].client = (
				await this.clientRepo.query(
					`select * from "user"."client" where "userId" = ${users[i].id}`,
				)
			)[0];
		}

		return users;
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
		const result = await this.repository.findOne({
			where: {
				id: id,
			},
			relations: ['profile'],
		});

		const admin = await this.adminRepo.query(
			`select * from "user"."admin" where "userId" = ${result.id}`,
		);
		const expert = await this.expertRepo.query(
			`select * from "user"."expert" where "userId" = ${result.id}`,
		);
		const client = await this.clientRepo.query(
			`select * from "user"."client" where "userId" = ${result.id}`,
		);

		return {
			...result,
			admin: admin[0],
			expert: expert[0],
			client: client[0],
		};
	}

	public async getProfileByID(id: number): Promise<User | UserNotFoundError> {
		return await this.repository.findOne({
			where: {
				id: id,
			},
			relations: ['profile'],
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

		await this.repository.save(user);

		switch (dto.profile) {
			case ROLES.Admin:
				const admin = new Admin();
				admin.user = user;
				await this.adminRepo.save(admin);
				break;
			case ROLES.Expert:
				const expert = new Expert();
				expert.phone = (profileDto as ExpertDto).phone;
				expert.position = (profileDto as ExpertDto).position;
				expert.certificate = (profileDto as ExpertDto).certificate;
				expert.direction = (profileDto as ExpertDto).direction;
				expert.user = user;
				await this.expertRepo.save(expert);
				break;
			case ROLES.Client:
				const client = new Client();
				client.phone = (profileDto as ClientDto).phone;
				client.user = user;
				await this.clientRepo.save(client);
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
