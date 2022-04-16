import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.model';

@Entity({
	schema: 'user',
})
export class Profile {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text', { unique: true })
	title: string;

	@OneToMany(() => User, (user) => user.profile)
	users: User[];

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
