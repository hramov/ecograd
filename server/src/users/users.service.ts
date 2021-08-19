import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findByEmail(createUserDto.email))
      throw new BadRequestException('This email is already registered');

    if (await this.findByPhone(createUserDto.phone))
      throw new BadRequestException('This phone number is already registerded');

    const user = await this.userRepository.create(createUserDto);
    user.roles = [];
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    if (users.length == 0) throw new NotFoundException('User not found')
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async findByPhone(phone: string) {
    return await this.userRepository.findOne({
      where: { phone },
      include: { all: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let result;
    if (updateUserDto.password) {
      result = await this.userRepository.update(
        { ...updateUserDto, password: await hash(updateUserDto.password, 5) },
        { where: { id } },
      );
    }
    result = await this.userRepository.update(updateUserDto, {
      where: { id },
    });
    if (result && result[0] > 0) return await this.findOne(id);
    throw new BadRequestException('Cannot update user');
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    const result = await this.userRepository.destroy({ where: { id } });
    if (result && result > 0) return user;
    throw new BadRequestException('Cannot remove user');
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.findOne(dto.userid);
    const role = await this.rolesService.findOne(dto.roleid);

    if (role && user) {
      if (user.roles.some((r) => r.id == role.id))
        throw new BadRequestException('User already has this role');

      await user.$add('role', role.id);

      user.roles.push(role);
      return user;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async removeRole(dto: AddRoleDto) {
    const user = await this.findOne(dto.userid);
    const role = await this.rolesService.findOne(dto.roleid);

    if (role && user) {
      if (user.roles.some((r) => r.id == role.id)) {
        await user.$remove('role', role.id);
        return user.roles.filter((r) => r.id != role.id);
      }
      throw new BadRequestException('User does not has this role');
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }
}
