import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.model';

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	title: string;

	@ManyToMany(() => User, (user) => user.id)
	users: User;
}
