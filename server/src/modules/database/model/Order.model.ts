import {
	Column,
	Entity,
	JoinTable,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.model';

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column('text', {
		unique: true,
	})
	title: string;

	@Column('text')
	type: string;

	@Column('text')
	address: string;

	@OneToOne(() => User, (user) => user.id)
	client: User;
}
