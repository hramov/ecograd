import { DataSource } from 'typeorm';
import { Attach } from './model/order/Attach.model';
import { Order } from './model/order/Order.model';
import { Section } from './model/order/Section.model';
import { Admin } from './model/user/profiles/Admin.model';
import { Client } from './model/user/profiles/Client.model';
import { Expert } from './model/user/profiles/Expert.model';
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
	entities: [User, Admin, Client, Expert, Order, Section, Attach],
	subscribers: [],
	migrations: [],
});
