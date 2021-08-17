import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  HasOne,
} from 'sequelize-typescript';
import { Client } from 'src/clients/models/client.model';
import { Expert } from 'src/experts/models/expert.model';
import { Role } from 'src/roles/models/role.model';
import { UserRole } from './user-role.model';

interface UserCreationAttrs {
  last_name?: string;
  name: string;
  second_name?: string;
  phone: string;
  birth_date?: Date;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  last_name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  second_name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone: string;

  @Column({ type: DataType.DATE, unique: false, allowNull: false })
  birth_date: Date;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasOne(() => Expert, { onDelete: 'CASCADE' })
  expert: Expert;

  @HasOne(() => Client, { onDelete: 'CASCADE' })
  client: Client;
}
