import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("text")
  text: string;

  @Column("timestamp")
  created_at: Date;
}
