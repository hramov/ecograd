import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { RolesEnum } from 'src/auth/roles-enum';
import { ExpertsService } from 'src/experts/experts.service';
import { UsersService } from 'src/users/users.service';
import { CreateOrderUnauthorizedDto } from './dto/create-order-unauthorized.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './models/order.model';

import archiver from 'archiver';
import rootPath from 'app-root-path';
import { createWriteStream, exists, existsSync, mkdir, mkdirSync } from 'fs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    private expertService: ExpertsService,
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const user = await this.userService.findOne(createOrderDto.userid);
      if (user && user.roles.some((role) => role.id === 3 || role.id === 1)) {
        const order = await this.orderRepository.create(createOrderDto);
        order.$set('client', user.id);
        order.client = user;
        return order;
      }
    } catch (err) {
      console.log(err);
    }
    return `You should be a client to make orders`;
  }

  async createOrderUnauthorized(orderDto: CreateOrderUnauthorizedDto) {
    try {
      const userData = {
        name: orderDto.name.split(' ')[0],
        phone: orderDto.phone,
        birth_date: new Date('1970-01-01'),
        email: orderDto.email,
        password: Date.now().toString(),
      };

      const orderData = {
        object: orderDto.object,
        object_type: orderDto.object_type,
      };

      let user = (await this.authService.register(userData)).user;
      if (!user) console.log('Cannot create user');
      user = await this.userService.addRole({
        roleid: RolesEnum.Client,
        userid: user.id,
      });

      if (user && user.roles.some((role) => role.id === 3 || role.id === 1)) {
        const order = await this.orderRepository.create(orderData);
        if (!order) console.log('Cannot create order');
        order.$set('client', user.id);
        order.client = user;

        user.password = userData.password;

        return {
          order: order,
          user: user,
        };
      }
    } catch (err) {
      console.log(err);
    }

    return `Something went wrong`;
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

  async findByClientId(clientid: number) {
    return await this.orderRepository.findAll({
      where: { clientid: clientid },
    });
  }

  async uploadDocs(id: number, files: Array<Express.Multer.File>) {
    const order = await this.findOne(id);
    const path = `uploads/orders/${id}_${Date.now().toString()}.zip`;
    const url = `orders/${id}_${Date.now().toString()}.zip`;
    const output = createWriteStream(path);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });
    archive.pipe(output);

    for (let i = 0; i < files.length; i++) {
      archive.append(files[i].buffer, { name: files[i].originalname });
    }
    archive.finalize();

    order.docs_url = url;
    order.save();
    return true;
  }
}
