import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Orders } from "./Order";

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("varchar", {
    nullable: true
  })
  last_name: string;

  @Column("varchar")
  name: string;

  @Column("varchar", {
    nullable: true
  })
  second_name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  phone: string;

  @Column("varchar")
  login: string;

  @Column("varchar")
  password: string;

  @Column('varchar', {
    nullable: true
  })
  role: string;

  @Column("varchar", {
    nullable: true,
  })
  telegram_id: number;

  @OneToMany(() => Orders, (order) => order.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  orders: Orders[];
}
