import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    const result = await this.roleRepository.create(createRoleDto);
    if (result) return result;
    throw new BadRequestException('Cannot create the role');
  }

  async findOne(id: number) {
    const result = await this.roleRepository.findByPk(id);
    if (result) return result;
    throw new BadRequestException('Cannot find role');
  }

  async findAll() {
    const result = await this.roleRepository.findAll();
    if (result && result.length > 0) return result;
    throw new BadRequestException('Cannot find roles');
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const result = await this.roleRepository.update(updateRoleDto, {
      where: { id },
    });
    if (result && result.length > 0) return await this.findOne(id);
    throw new BadRequestException('Cannot update the role');
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    const result = await this.roleRepository.destroy({ where: { id } });
    if (result && result > 0) return role;
    throw new BadRequestException('Cannot remove the role');
  }
}
