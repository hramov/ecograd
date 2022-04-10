import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expert {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	name: string;

	@Column('text')
	description: string;

	@Column('text')
	email: string;

	@Column('text')
	phone: string;
}
