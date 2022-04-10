import { Repository } from 'typeorm';
import { User } from '../../../entity/user/user.entity';
import { UserNotFoundError } from '../../error/app/user-not-found.error';
import { AppDataSource } from '../data-source';

export class UserAccess {
	private repository: Repository<User>;
	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	public async getUserByUsernameAndPassword(
		username: string,
		password: string,
	): Promise<User | UserNotFoundError> {
		const candidate = await this.repository.findOneBy({
			username: username,
			password: password,
		});
		return candidate ? candidate : new UserNotFoundError(username);
	}

	public async getUserByID(id: string): Promise<User | UserNotFoundError> {
		const user = await this.repository.findOneBy({ id: id });
		return user ? user : new UserNotFoundError();
	}

	public async createUser(user: User): Promise<string> {
		const result = await this.repository.save(user);
		if (result instanceof User) {
			return result.id;
		}
		return null;
	}
}
