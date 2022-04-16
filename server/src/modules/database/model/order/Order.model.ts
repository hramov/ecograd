import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../user/Client.model';
import { Attach } from './Attach.model';
import { Section } from './Section.model';

@Entity({
	schema: 'order',
})
export class Order {
	@PrimaryGeneratedColumn()
	id?: number;

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

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
