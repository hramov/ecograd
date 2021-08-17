import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/clients/models/client.model';

interface FeedbackCreationAttrs {
  name: string;
  email: string;
  feedback: string;
}

@Table({ tableName: 'feedbacks' })
export class Feedback extends Model<Feedback, FeedbackCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  email: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  feedback: string;

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER })
  clientid: number;

  @BelongsTo(() => Client, { onDelete: 'CASCADE' })
  client: Client;
}
