import { Column, DataType, Table, Model, BelongsToMany } from 'sequelize-typescript';
import { UserRole } from 'src/users/models/user-role.model';
import { User } from 'src/users/models/user.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number

    @Column({ type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @Column({ type: DataType.STRING, unique: true, allowNull: false})
    description: string

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}
