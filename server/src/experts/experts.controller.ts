import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ExpertsService } from './experts.service';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';
import { RolesEnum } from 'src/auth/roles-enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('experts')
export class ExpertsController {
  constructor(private readonly expertsService: ExpertsService) {}

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createExpertDto: CreateExpertDto) {
    return await this.expertsService.create(createExpertDto);
  }

  // @Roles(RolesEnum.Admin)
  // @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return await this.expertsService.findAll();
  }

  @Roles(RolesEnum.Admin, RolesEnum.Expert)
  @UseGuards(RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.expertsService.findOne(id);
  }

  @Roles(RolesEnum.Admin, RolesEnum.Expert)
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateExpertDto: UpdateExpertDto,
  ) {
    return await this.expertsService.update(id, updateExpertDto);
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.expertsService.remove(id);
  }

  @Roles(RolesEnum.Admin, RolesEnum.Expert)
  @UseGuards(RolesGuard)
  @Patch('new/:id')
  async assignExpert(@Param('id') id: number, @Body('userid') userid: number) {
    return await this.expertsService.assignToExpert(id, userid);
  }
}
