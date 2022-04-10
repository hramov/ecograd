import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role.model';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	username: string;

	@Column('text')
	password: string;

	@Column('text')
	name: string;

	@ManyToMany(() => Role, (role) => role.id)
	@JoinTable()
	roles: Role[];
}
