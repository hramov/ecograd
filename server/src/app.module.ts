/** Core dependencies */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

/** Custom modules */
import { UsersModule } from './users/users.module';
import { ExpertsModule } from './experts/experts.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

/** Custom models */
import { User } from './users/models/user.model';
import { Role } from './roles/models/role.model';
import { UserRole } from './users/models/user-role.model';
import { Expert } from './experts/models/expert.model';
import { Order } from './orders/models/order.model';
import { EmailModule } from './email/email.module';
import { Feedback } from './orders/models/feedback.model';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    OrdersModule,
    ExpertsModule,
    AuthModule,

    /** ENV configuration */
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    /** Database configuration */
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'ecograd',
      models: [User, Role, UserRole, Expert, Order, Feedback],
      synchronize: true,
      autoLoadModels: true,
      logging: false,
      timezone: '+07:00',
    }),

    EmailModule,
  ],
})
export class AppModule {}
