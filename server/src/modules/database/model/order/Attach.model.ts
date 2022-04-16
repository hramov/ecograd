import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order.model';
import { Section } from './Section.model';

@Entity({
	schema: 'order',
})
export class Attach {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column('text', {
		unique: true,
	})
	title: string;

	@Column('text', { unique: true })
	path: string;

	@Column('boolean')
	is_new: boolean;

	@ManyToOne(() => Order, (order: Order) => order.id)
	order: Order;

	@ManyToOne(() => Section, (section: Section) => section.id)
	section: Section;

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
