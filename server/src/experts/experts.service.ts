import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { writeFileSync } from 'fs';
import { UsersService } from 'src/users/users.service';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';
import { Expert } from './models/expert.model';

@Injectable()
export class ExpertsService {
  constructor(
    @InjectModel(Expert) private expertRepository: typeof Expert,
    private userService: UsersService,
  ) {}

  async create(createExpertDto: CreateExpertDto) {
    const user = await this.userService.findOne(createExpertDto.userid);
    const expert = await this.expertRepository.create(createExpertDto);
    expert.user = user;
    expert.save();
    return expert;
  }

  async findAll() {
    return await this.expertRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.expertRepository.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateExpertDto: UpdateExpertDto) {
    const result = await this.expertRepository.update(updateExpertDto, {
      where: { id },
    });

    if (result && result[0] > 0) return this.findOne(id);
    throw new BadRequestException('Cannot update expert');
  }

  async remove(id: number) {
    const expert = await this.findOne(id);
    const result = await this.expertRepository.destroy({ where: { id } });
    if (result && result > 0) return expert;
    throw new BadRequestException('Cannot delete user');
  }

  async assignToExpert(id: number, userid: number) {
    const user = await this.userService.findOne(userid);
    const expert = await this.findOne(id);

    if (user && expert) {
      if (user.expert)
        throw new BadRequestException('User is already assign to expert');
      await expert.$set('user', userid);
      expert.user = user;
      return expert;
    }
  }
}
