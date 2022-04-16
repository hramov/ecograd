import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.model';

@Entity({
	schema: 'user',
})
export class Admin {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
