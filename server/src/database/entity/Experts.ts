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

  @Column("timestamp", { nullable: true })
  birth_date: Date;

  @Column("varchar", { nullable: true })
  email: string;

  @Column("varchar", { nullable: true })
  phone: string;

  @Column("text")
  cert: string;

  @Column("text")
  direction: string;

  @Column("text", {
    nullable: true
  })
  misc: string;

  @Column("timestamp")
  created_at: Date;
}
