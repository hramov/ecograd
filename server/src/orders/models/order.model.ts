import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/clients/models/client.model';
import { Expert } from 'src/experts/models/expert.model';

interface OrderCreationAttrs {
  object: string;
  object_type: 1 | 2;
  isDocs?: boolean;
  docsUrl?: string;
  status?: 'new' | 'inWork' | 'done';
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  object: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  object_type: 1 | 2;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isDocs: boolean;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  docs_url: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'new' })
  status: 'new' | 'inWork' | 'done';

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER })
  clientid: number;
  
  @BelongsTo(() => Client, { onDelete: 'CASCADE'})
  client: Client;

  @ForeignKey(() => Expert)
  @Column({ type: DataType.INTEGER })
  expertid: number;

  @BelongsTo(() => Expert, { onDelete: 'CASCADE'})
  expert: Expert;
  
}
