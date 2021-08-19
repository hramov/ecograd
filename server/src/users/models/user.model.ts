import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Expert } from 'src/experts/models/expert.model';
import { Order } from 'src/orders/models/order.model';
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

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  last_name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  second_name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone: string;

  @Column({ type: DataType.DATE, unique: false, allowNull: true })
  birth_date: Date;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  password: string;

  @HasMany(() => Order)
  orders: Order[];

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasOne(() => Expert, { onDelete: 'CASCADE' })
  expert: Expert;
}
