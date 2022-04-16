import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.model';

@Entity({
	schema: 'user',
})
export class Admin {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User, (user) => user.id)
	user: User;

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
