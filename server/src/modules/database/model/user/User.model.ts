import {
	Column,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from './Admin.model';
import { Client } from './Client.model';
import { Expert } from './Expert.model';
import { Profile } from './Profile.model';

@Entity({
	schema: 'user',
})
export class User {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column('text', { unique: true, nullable: false })
	name: string;

	@Column('text', {
		unique: true,
		nullable: false,
	})
	email: string;

	@Column('text', { nullable: false })
	password: string;

	@ManyToOne(() => Profile, (profile) => profile.id, {
		cascade: true,
	})
	profile: Profile;

	@OneToOne(() => Admin)
	admin: Admin;

	@OneToOne(() => Expert)
	expert: Expert;

	@OneToOne(() => Client)
	client: Client;

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
