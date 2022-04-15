import { Repository } from 'typeorm';
import { UserNotFoundError } from '../../error/app/user-not-found.error';
import { AppDataSource } from '../data-source';
import { User } from '../model/User.model';
import { hashSync, compareSync } from 'bcrypt';
export class UserAccess {
	private repository: Repository<User>;
	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	public async getUserByEmailAndPassword(
		email: string,
		password: string,
	): Promise<User | UserNotFoundError> {
		const user = await this.repository.findOneBy({
			email: email,
		});

		if (user && this.checkPassword(password, user.password)) {
			return user;
		}
		return null;
	}

	public async checkIfUserExistsByEmail(email: string): Promise<boolean> {
		const user = await this.repository.findOneBy({
			email: email,
		});
		return !!user;
	}

	public async getUserByID(id: number): Promise<User | UserNotFoundError> {
		return await this.repository.findOneBy({ id: id });
	}

	public async createUser(user: User): Promise<User> {
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
		const result = compareSync(password, passwordHash);
		return result;
	}
}
