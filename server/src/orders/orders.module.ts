import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { Expert } from 'src/experts/models/expert.model';
import { AuthModule } from 'src/auth/auth.module';
import { ExpertsModule } from 'src/experts/experts.module';
import { UsersModule } from 'src/users/users.module';
import { Feedback } from './models/feedback.model';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    AuthModule,
    ExpertsModule,
    UsersModule,
    SequelizeModule.forFeature([
      Order, Expert, Feedback
    ])
  ]
})
export class OrdersModule {}
