import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './models/client.model';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client) private clientRepository: typeof Client,
    private userService: UsersService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    return await this.clientRepository.create(createClientDto);
  }

  async findAll() {
    return await this.clientRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.clientRepository.findByPk(id, { include: { all: true } });
  }

  async findByUserId(id: number) {
    return await this.clientRepository.findOne({
      where: { userid: id },
      include: { all: true },
    });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const result = await this.clientRepository.update(updateClientDto, {
      where: { id },
    });
    if (result && result[0] != 0) return await this.findOne(id);
    throw new BadRequestException('Cannot update client');
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    const result = await this.clientRepository.destroy({ where: { id } });
    if (result && result != 0) return user;
    throw new BadRequestException('Cannot remove client');
  }

  async assignToClient(id: number, userid: number) {
    const client = await this.findOne(id);
    const user = await this.userService.findOne(userid);
    if (user && client) {
      if (user.client)
        throw new BadRequestException(
          'This user is already assigned to client',
        );
      await client.$set('user', userid);
      client.user = user;
      return client;
    }
  }
}
