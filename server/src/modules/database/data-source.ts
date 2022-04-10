import { DataSource } from 'typeorm';
import { Expert } from './model/Expert.model';
import { Role } from './model/Role.model';
import { User } from './model/User.model';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'ecograd',
	synchronize: true,
	logging: true,
	entities: [User, Role, Expert],
	subscribers: [],
	migrations: [],
});
