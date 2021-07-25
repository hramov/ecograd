import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Experts {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  last_name: string;

  @Column("varchar")
  second_name: string;

  @Column("varchar", { nullable: true })
  image_url: string;

  @Column("varchar")
  position: string;

  @Column("timestamp")
  birth_date: Date;

  @Column("varchar")
  email: string;

  @Column("varchar")
  phone: string;

  @Column("text")
  cert: string;

  @Column("text")
  direction: string;

  @Column("text")
  misc: string;

  @Column("timestamp")
  created_at: Date;
}
