import {
  Model,
  Column,
  DataType,
  Table,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Order } from 'src/orders/models/order.model';
import { User } from 'src/users/models/user.model';

interface ExpertCreationAttrs {
  position: string;
  cert: string;
  direction: string;
  misc?: string;
}

@Table({ tableName: 'experts' })
export class Expert extends Model<Expert, ExpertCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  position: string;

  @Column({ type: DataType.STRING, allowNull: false })
  cert: string;

  @Column({ type: DataType.STRING, allowNull: false })
  direction: string;

  @Column({ type: DataType.STRING, allowNull: true })
  misc: string;

  @HasMany(() => Order, { onDelete: 'CASCADE' })
  orders: Order[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userid: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;
}
