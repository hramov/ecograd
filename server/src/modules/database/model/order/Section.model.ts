import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order.model';

@Entity({
	schema: 'order',
})
export class Section {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column('text', {
		unique: true,
	})
	title: string;

	@Column('text')
	status: string;

	@ManyToOne(() => Order, (order: Order) => order.id)
	order: Order;

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
