import { hashSync } from 'bcrypt';
import { Logger } from '../../logger';
import { Admin } from '../models/user/profiles/Admin.model';
import { User } from '../models/user/User.model';

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

		Logger.writeInfo('Successfully initialized user admin@ecograd.ru');
		const admin = Admin.create({
			user,
		});

		await admin.save();
		Logger.writeInfo('Successfully initialized profile Admin');
	}
}
