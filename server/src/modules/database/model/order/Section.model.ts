import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ecograd } from '../Ecograd.model';
import { Order } from './Order.model';

@Entity({
	schema: 'business',
})
export class Section extends Ecograd {
	@Column('varchar')
	arrange: string;

	@Column('text', {
		unique: true,
	})
	title: string;

	@Column('text')
	status: string;

	@ManyToOne(() => Order, (order: Order) => order.id)
	order: Order;
}
