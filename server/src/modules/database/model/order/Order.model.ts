import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Ecograd } from '../Ecograd.model';
import { Client } from '../user/profiles/Client.model';
import { Attach } from './Attach.model';
import { Section } from './Section.model';

@Entity({
	schema: 'business',
})
export class Order extends Ecograd {
	@Column('text', {
		unique: true,
	})
	title: string;

	@Column('text')
	type: string;

	@Column('text')
	status: string;

	@ManyToOne(() => Client, (client: Client) => client.id)
	client: Client;

	@OneToMany(() => Attach, (attach: Attach) => attach.id)
	files: Attach[];

	@OneToMany(() => Section, (section: Section) => section.id)
	section: Section[];
}
