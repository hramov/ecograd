import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Ecograd } from '../../Ecograd.model';
import { User } from '../User.model';

@Entity()
export class Profile extends Ecograd {
	@OneToOne(() => User, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: User;
}
