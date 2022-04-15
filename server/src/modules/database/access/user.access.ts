import { Repository } from 'typeorm';
import { UserNotFoundError } from '../../error/app/user-not-found.error';
import { AppDataSource } from '../data-source';
import { User } from '../model/User.model';

export class UserAccess {
	private repository: Repository<User>;
	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	public async getUserByEmailAndPassword(
		email: string,
		password: string,
	): Promise<User | UserNotFoundError> {
		console.log(Buffer.from(password).toString('base64'));
		const candidate = await this.repository.findOneBy({
			email: email,
			password: Buffer.from(password).toString('base64'),
		});
		return candidate ? candidate : new UserNotFoundError(email);
	}

	public async checkIfUserExistsByEmail(email: string): Promise<boolean> {
		const user = await this.repository.findOneBy({
			email: email,
		});
		if (user) {
			console.log(123);
		}
		return true;
	}

	public async getUserByID(id: number): Promise<User | UserNotFoundError> {
		const user = await this.repository.findOneBy({ id: id });
		return user ? user : new UserNotFoundError();
	}

	public async createUser(user: User): Promise<number> {
		user.password = Buffer.from(user.password).toString('base64');
		const result = await this.repository.save(user);
		if (result instanceof User) {
			return result.id;
		}
		return null;
	}

	public async userCount() {
		return await this.repository.count();
	}
}
