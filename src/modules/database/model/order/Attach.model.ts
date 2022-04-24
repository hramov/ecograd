import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ecograd } from '../Ecograd.model';
import { User } from '../user/User.model';
import { Order } from './Order.model';
import { Section } from './Section.model';

@Entity({
	schema: 'business',
})
export class Attach extends Ecograd {
	@Column('text')
	title: string;

	@Column('text', { unique: true })
	path: string;

	@Column('boolean')
	is_new: boolean;

	@ManyToOne(() => Order, (order: Order) => order.id)
	order: Order;

	@ManyToOne(() => Section, (section: Section) => section.id)
	section: Section;

	@ManyToOne(() => User, (user: User) => user.id)
	sender: User;
}
