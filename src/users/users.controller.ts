import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: { username: string; platform: string }) {

    const user = await this.usersService.create(body.username, body.platform);
    return user;

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    return await this.usersService.findOne(id);
    
  }
}
