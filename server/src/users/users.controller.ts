import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesEnum } from 'src/auth/roles-enum';
import { AddRoleDto } from './dto/add-role.dto';
import { Request } from 'express';
import { JwtAccessGuard } from 'src/auth/jwt-access.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Get('expert')
  async findUsersForExperts() {
    return await this.usersService.findUsersForExperts();
  }

  // @Roles(RolesEnum.Admin)
  // @UseGuards(RolesGuard)
  @Get('uexpert')
  async findUExperts() {
    return await this.usersService.findUExperts();
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Post('/add-role')
  async addRole(@Body() dto: AddRoleDto) {
    return await this.usersService.addRole(dto);
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Post('/remove-role')
  async removeRole(@Body() dto: AddRoleDto) {
    return await this.usersService.removeRole(dto);
  }

  @UseGuards(JwtAccessGuard)
  @Get(':id')
  async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @UseGuards(JwtAccessGuard)
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  async remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }

  @Roles(RolesEnum.Admin)
  @UseGuards(RolesGuard)
  @Patch('image/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async appendImage(
    @Param('id') id: number,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    return await this.usersService.appendImage(id, file[0]);
  }
}
