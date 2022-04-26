import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ecograd extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;
}
