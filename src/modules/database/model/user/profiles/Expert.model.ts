import { Column, Entity } from 'typeorm';
import { Profile } from './Profile.model';

@Entity({
	schema: 'auth',
})
export class Expert extends Profile {
	@Column('text', { unique: true, nullable: true })
	phone: string;

	@Column('text')
	position: string;

	@Column('text')
	certificate: string;

	@Column('text')
	direction: string;

	@Column('text', { nullable: true })
	misc: string;
}
