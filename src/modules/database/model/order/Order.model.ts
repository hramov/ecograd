import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Ecograd } from '../Ecograd.model';
import { Client } from '../user/profiles/Client.model';
import { Expert } from '../user/profiles/Expert.model';
import { Attach } from './Attach.model';
import { Section } from './Section.model';

@Entity({
	schema: 'business',
})
export class Order extends Ecograd {
	@Column('text')
	title: string;

	@Column('text', { nullable: true })
	exp_type: string;

	@Column('text', { nullable: true })
	object_type: string;

	@Column('text', { nullable: true })
	docs_cipher: string;

	@Column('text', { nullable: true })
	rii_cipher: string;

	@Column('text')
	status: string;

	@ManyToOne(() => Client, (client: Client) => client.id)
	@JoinColumn()
	client: Client;

	@ManyToOne(() => Expert, (expert: Expert) => expert.id)
	@JoinColumn()
	expert: Expert;

	@OneToMany(() => Attach, (attach: Attach) => attach.id)
	files: Attach[];

	@OneToMany(() => Section, (section: Section) => section.id)
	sections: Section[];
}
