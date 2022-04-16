import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile.model';
import { Role } from './Role.model';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column('text', {
		unique: true,
	})
	email: string;

	@Column('text')
	password: string;

	@Column('text')
	name: string;

	@ManyToOne(() => Profile, (profile) => profile.id)
	profile: Profile;

	@ManyToMany(() => Role, (role) => role.id)
	@JoinTable()
	roles: Role[];

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
