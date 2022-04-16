import { autoInjectable } from 'tsyringe';
import { AdminDto } from '../../../entity/auth/dto/admin.dto';
import { UserDto } from '../../../entity/auth/dto/user.dto';
import { AdminAccess } from '../access/admin.access';
import { ProfileAccess } from '../access/profile.access';
import { UserAccess } from '../access/user.access';
import { Admin } from '../model/user/Admin.model';
import { Profile } from '../model/user/Profile.model';

import { User } from '../model/user/User.model';

@autoInjectable()
export class DatabaseIniter {
	constructor(
		private readonly userAccess?: UserAccess,
		private readonly profileAccess?: ProfileAccess,
		private readonly adminAccess?: AdminAccess,
	) {}

	public async initUser() {
		// const isInited = !!(await this.userAccess.userCount());
		// if (isInited) return;

		const admin = {} as UserDto;
		admin.name = 'Администратор';
		admin.email = 'admin@ecograd.ru';
		admin.password = 'admin';

		const adminProfile = new Profile();
		adminProfile.title = 'Администратор';
		await this.profileAccess.save(adminProfile);
		admin.profile = 'Администратор';

		const adminTable = {} as AdminDto;
		await this.userAccess.create(admin, adminTable);
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
