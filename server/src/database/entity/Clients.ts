import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("varchar")
  last_name: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  second_name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  phone: string;

  @Column("varchar")
  login: string;

  @Column("varchar")
  password: string;

  @Column("varchar", {
    nullable: true,
  })
  telegram_id: number;
}
