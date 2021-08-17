import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/orders/models/order.model';
import { User } from 'src/users/models/user.model';

interface ClientCreationAttrs {
  orders_count: number;
}

@Table({ tableName: 'clients' })
export class Client extends Model<Client, ClientCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  orders_count: number;

  @HasMany(() => Order)
  orders: Order[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userid: number
  
  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;
}
