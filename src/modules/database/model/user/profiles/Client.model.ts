import { Column, Entity, OneToMany } from 'typeorm';
import { Order } from '../../order/Order.model';
import { Profile } from './Profile.model';

@Entity({
	schema: 'auth',
})
export class Client extends Profile {
	@Column('text', { unique: true, nullable: false })
	phone: string;

	@OneToMany(() => Order, (order: Order) => order.id)
	orders: Order[];
}
