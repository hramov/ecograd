import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { Order } from 'src/orders/models/order.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([Client, Order]),
    UsersModule,
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
