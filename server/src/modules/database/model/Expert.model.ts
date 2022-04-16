import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expert {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	name: string;

	@Column('text')
	birth_date: string;

	@Column('text')
	email: string;

	@Column('text')
	password: string;

	@Column('text')
	phone: string;

	@Column('text')
	position: string;

	@Column('text')
	certificate: string;

	@Column('text')
	direction: string;

	@Column('text')
	misc: string;
}
