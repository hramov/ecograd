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
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesEnum } from 'src/auth/roles-enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientsService.create(createClientDto);
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return await this.clientsService.findAll();
  }

  @Roles(RolesEnum.Admin, RolesEnum.Client)
  @UseGuards(RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.clientsService.findOne(id);
  }

  @Roles(RolesEnum.Admin, RolesEnum.Client)
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientsService.update(id, updateClientDto);
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.clientsService.remove(id);
  }

  @Roles(RolesEnum.Admin, RolesEnum.Client)
  @UseGuards(RolesGuard)
  @Patch('new/:id')
  async assignToClient(
    @Param('id') id: number,
    @Body('userid') userid: number,
  ) {
    return await this.clientsService.assignToClient(id, userid);
  }
}
