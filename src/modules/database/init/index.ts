import { hashSync } from 'bcrypt';
import { Admin } from '../model/user/profiles/Admin.model';
import { User } from '../model/user/User.model';

export class DatabaseIniter {
	public static async initUser() {
		if ((await User.find()).length) {
			return;
		}

		const user = User.create({
			name: 'Администратор',
			email: 'admin@ecograd.ru',
			password: hashSync('admin', 10),
			profile: 'Администратор',
		});

		await user.save();

		const admin = Admin.create({
			user,
		});

		await admin.save();
	}
}
