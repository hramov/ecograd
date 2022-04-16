import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/Order.model';
import { User } from './User.model';

@Entity({
	schema: 'user',
})
export class Client {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

	@Column('text', { unique: true, nullable: false })
	phone: string;

	@OneToMany(() => Order, (order: Order) => order.id)
	orders: Order[];

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
