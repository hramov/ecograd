import { DataSource } from 'typeorm';
import { Attach } from './model/order/Attach.model';
import { Order } from './model/order/Order.model';
import { Section } from './model/order/Section.model';
import { Admin } from './model/user/Admin.model';
import { Client } from './model/user/Client.model';
import { Expert } from './model/user/Expert.model';
import { Profile } from './model/user/Profile.model';
import { User } from './model/user/User.model';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'ecograd',
	synchronize: true,
	logging: true,
	entities: [User, Expert, Order, Profile, Section, Attach, Client, Admin],
	subscribers: [],
	migrations: [],
});
