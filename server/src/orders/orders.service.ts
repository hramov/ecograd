import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClientsService } from 'src/clients/clients.service';
import { ExpertsService } from 'src/experts/experts.service';
import { UsersService } from 'src/users/users.service';
import { CreateOrderUnauthorizedDto } from './dto/create-order-unauthorized.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    private expertService: ExpertsService,
    private clientService: ClientsService,
    private userService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const client = await this.clientService.findByUserId(createOrderDto.id);
    if (client) {
      const order = await this.orderRepository.create(createOrderDto);
      order.$set('client', client.id);
      order.client = client;
      return order;
    }
    return `You should be a client to make orders`;
  }

  async createOrderUnauthorized(orderDto: CreateOrderUnauthorizedDto) {
    const userData = {
      name: orderDto.name,
      email: orderDto.email,
      phone: orderDto.phone,
      password: Date.now().toString(),
    };

    const orderData = {
      object: orderDto.object,
      object_type: orderDto.object_type,
    };

    const order = await this.orderRepository.create(orderData);
    if (!order) throw new BadRequestException('Cannot create order');

    const user = await this.userService.create(userData);
    if (!user) throw new BadRequestException('Cannot create user');

    return {
      order: order,
      user: user,
    };
  }

  async findAll() {
    return await this.orderRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.orderRepository.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const result = await this.orderRepository.update(updateOrderDto, {
      where: { id },
    });
    if (result && result[0] != 0) {
      return await this.findOne(id);
    }
    throw new BadRequestException('Cannot update order');
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (order) {
      const result = await this.orderRepository.destroy({ where: { id } });
      if (result == 0) throw new BadRequestException('Cannot remove the order');
      return order;
    }
    throw new NotFoundException('Cannot find the order to delete');
  }

  async addExpert(id: number, expertid: number) {
    const order = await this.findOne(id);
    if (order.expert)
      throw new BadRequestException('Order already has an expert');
    order.$set('expert', expertid);
    order.expert = await this.expertService.findOne(expertid);
    return order;
  }

  async addClient(id: number, clientid: number) {
    const order = await this.findOne(id);
    if (order.client)
      throw new BadRequestException('Order already has a client');
    order.$set('client', clientid);
    order.client = await this.clientService.findOne(clientid);
    return order;
  }
}
