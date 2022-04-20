import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Ecograd } from '../Ecograd.model';
import { Attach } from './Attach.model';
import { Order } from './Order.model';

@Entity({
	schema: 'business',
})
export class Section extends Ecograd {
	@Column('varchar')
	arrange: string;

	@Column('text')
	title: string;

	@Column('text')
	status: string;

	@ManyToOne(() => Order, (order: Order) => order.id)
	order: Order;

	@OneToMany(() => Attach, (attach: Attach) => attach.id)
	attach: Attach[];
}
