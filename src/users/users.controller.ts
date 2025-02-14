import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() body: { username: string; plataform: string }) {

        const user = await this.usersService.create(body.username, body.plataform);
        return user;

    }

}