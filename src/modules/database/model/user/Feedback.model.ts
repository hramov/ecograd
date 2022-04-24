import { Column, Entity } from 'typeorm';
import { Ecograd } from '../Ecograd.model';

@Entity({
	schema: 'auth',
})
export class Feedback extends Ecograd {
	@Column('text', { nullable: false })
	name: string;

	@Column('text', {
		nullable: false,
	})
	email: string;

	@Column('text', { nullable: true })
	feedback: string;
}
