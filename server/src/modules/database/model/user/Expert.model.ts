import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.model';

@Entity({
	schema: 'user',
})
export class Expert {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

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

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
