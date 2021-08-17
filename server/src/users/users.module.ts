import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/models/role.model';
import { User } from './models/user.model';
import { UserRole } from './models/user-role.model';
import { Client } from 'src/clients/models/client.model';
import { Expert } from 'src/experts/models/expert.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    RolesModule,
    SequelizeModule.forFeature([
      Role, User, UserRole, Client, Expert
    ])
  ],
  exports: [UsersService]
})
export class UsersModule {}
