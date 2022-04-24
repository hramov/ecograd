import { Column, Entity } from 'typeorm';
import { Ecograd } from '../Ecograd.model';

@Entity({
	schema: 'auth',
})
export class User extends Ecograd {
	@Column('text', { unique: true, nullable: false })
	name: string;

	@Column('text', {
		unique: true,
		nullable: false,
	})
	email: string;

	@Column('text', { nullable: false })
	password: string;

	@Column()
	profile: string;
}
