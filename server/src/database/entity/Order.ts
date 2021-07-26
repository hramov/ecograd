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
    nullable: true,
  })
  object_type: string;

  @Column("varchar", {
    nullable: true,
  })
  files_url: string;

  @Column("timestamp")
  created_at: Date;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "userId" })
  exec: Users;

  @ManyToOne(() => Clients, (client) => client.id)
  @JoinColumn({ name: "clientId" })
  client: Clients;
}
