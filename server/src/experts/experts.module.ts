import { Module } from '@nestjs/common';
import { ExpertsService } from './experts.service';
import { ExpertsController } from './experts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expert } from './models/expert.model';
import { Order } from 'src/orders/models/order.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ExpertsController],
  providers: [ExpertsService],
  imports: [
    AuthModule,
    UsersModule,
    SequelizeModule.forFeature([Expert, Order])],
  exports: [
    ExpertsService
  ]
})
export class ExpertsModule {}
