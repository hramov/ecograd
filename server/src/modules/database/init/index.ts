import { autoInjectable } from 'tsyringe';
import { ProfileAccess } from '../access/profile.access';
import { RoleAccess } from '../access/role.access';
import { UserAccess } from '../access/user.access';
import { Profile } from '../model/Profile.model';
import { Role } from '../model/Role.model';
import { User } from '../model/User.model';

@autoInjectable()
export class DatabaseIniter {
	constructor(
		private readonly userAccess?: UserAccess,
		private readonly roleAccess?: RoleAccess,
		private readonly profileAccess?: ProfileAccess,
	) {}

	public async initUser() {
		const isInited = !!(await this.userAccess.userCount());
		if (isInited) return;

		const adminRole = await this.initRole();

		const admin = new User();
		admin.name = 'Администратор';
		admin.email = 'admin';
		admin.password = 'admin';
		admin.roles = [adminRole];

		const adminProfile = new Profile();
		adminProfile.title = 'Администратор';
		await this.profileAccess.save(adminProfile);

		admin.profile = adminProfile;

		await this.userAccess.createUser(admin);
	}

	public async initRole() {
		const adminRole = new Role();
		adminRole.title = 'Администратор';
		await this.roleAccess.save(adminRole);
		return adminRole;
	}

	public async initProfile() {
		const expert = new Profile();
		expert.title = 'Эксперт';

		const client = new Profile();
		client.title = 'Клиент';

		await this.profileAccess.save(expert);
		await this.profileAccess.save(client);
	}
}
