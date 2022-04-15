import { autoInjectable } from 'tsyringe';
import { RoleAccess } from '../access/role.access';
import { UserAccess } from '../access/user.access';
import { Role } from '../model/Role.model';
import { User } from '../model/User.model';

@autoInjectable()
export class DatabaseIniter {
	constructor(
		private readonly userAccess?: UserAccess,
		private readonly roleAccess?: RoleAccess,
	) {}

	public async initUser() {
		const isInited = !!(await this.userAccess.userCount());
		if (isInited) return;

		const adminRole = new Role();
		adminRole.title = 'Администратор';
		await this.roleAccess.save(adminRole);

		const admin = new User();
		admin.name = 'Администратор';
		admin.email = 'admin';
		admin.password = 'admin';
		admin.roles = [adminRole];

		await this.userAccess.createUser(admin);
	}

	public async initRole() {}
}
