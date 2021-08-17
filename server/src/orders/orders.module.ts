import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { Client } from 'src/clients/models/client.model';
import { Expert } from 'src/experts/models/expert.model';
import { AuthModule } from 'src/auth/auth.module';
import { ExpertsModule } from 'src/experts/experts.module';
import { ClientsModule } from 'src/clients/clients.module';
import { UsersModule } from 'src/users/users.module';
import { Feedback } from './models/feedback.model';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    AuthModule,
    ExpertsModule,
    ClientsModule,
    UsersModule,
    SequelizeModule.forFeature([
      Order, Client, Expert, Feedback
    ])
  ]
})
export class OrdersModule {}
