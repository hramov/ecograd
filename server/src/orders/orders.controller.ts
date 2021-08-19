import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesEnum } from 'src/auth/roles-enum';
import { CreateOrderUnauthorizedDto } from './dto/create-order-unauthorized.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Post('/unauthorized')
  async createOrderUnauthorized(@Body() orderDto: CreateOrderUnauthorizedDto) {
    return await this.ordersService.createOrderUnauthorized(orderDto);
  }

  @Roles(RolesEnum.Admin, RolesEnum.Expert)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Roles(RolesEnum.Admin, RolesEnum.Expert, RolesEnum.Client)
  @UseGuards(RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.ordersService.findOne(id);
  }

  @Roles(RolesEnum.Admin, RolesEnum.Expert, RolesEnum.Client)
  @UseGuards(RolesGuard)
  @Get('client/:clientid')
  async findByClientId(@Param('clientid') clientid: number) {
    console.log(123)
    return await this.ordersService.findByClientId(clientid);
  }

  @Roles(RolesEnum.Admin, RolesEnum.Expert, RolesEnum.Client)
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.update(id, updateOrderDto);
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.ordersService.remove(id);
  }

  @Roles(RolesEnum.Admin, RolesEnum.Expert)
  @UseGuards(RolesGuard)
  @Patch('expert/:id')
  async addExpert(@Param('id') id: number, @Body('expertid') expertid: number) {
    return await this.ordersService.addExpert(id, expertid);
  }

}
