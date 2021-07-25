import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Orders } from "./Order";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  last_name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  role: string;

  @Column("timestamp")
  birthdate: Date;

  @Column("varchar")
  login: string;

  @Column("varchar")
  password: string;

  @Column("varchar", {
    nullable: true,
  })
  telegram_id: number;

  @OneToMany(() => Orders, (order) => order.exec)
  orders: Orders[];
}
