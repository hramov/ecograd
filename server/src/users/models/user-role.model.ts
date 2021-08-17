import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from 'src/roles/models/role.model';
import { User } from 'src/users/models/user.model';

@Table({ tableName: 'user_role' })
export class UserRole extends Model<UserRole> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  userid: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  roleid: number;
}
