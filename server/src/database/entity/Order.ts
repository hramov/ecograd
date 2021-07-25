import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Clients } from "./Clients";
import { Users } from "./Users";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("varchar")
  object: string;

  @Column("varchar", {
      nullable: true
  })
  type: string;

  @Column("timestamp")
  created_at: Date;

  @ManyToOne(() => Users, (user) => user.id)
  exec: Users;

  @ManyToOne(() => Clients, (client) => client.id)
  client: Clients;
}
