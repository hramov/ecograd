import { Column, Entity, ManyToOne } from 'typeorm';
import { Ecograd } from '../Ecograd.model';
import { User } from '../user/User.model';
import { Order } from './Order.model';
import { Section } from './Section.model';

@Entity({
	schema: 'business',
})
export class Inquire extends Ecograd {
	@Column('text', { unique: false })
	title: string;

	@Column('text', { unique: true })
	path: string;

	@ManyToOne(() => Order, (order: Order) => order.id)
	order: Order;

	@ManyToOne(() => User, (user: User) => user.id)
	sender: User;
}
