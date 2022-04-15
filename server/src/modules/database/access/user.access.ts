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
		return await this.repository.findOneBy({
			email: email,
			password: Buffer.from(password).toString('base64'),
		});
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
		user.password = Buffer.from(user.password).toString('base64');
		return await this.repository.save(user);
	}

	public async userCount() {
		return await this.repository.count();
	}
}
