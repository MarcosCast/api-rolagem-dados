import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

  ) {}

  async create(username: string, platform: string): Promise<User> {

    const user = this.userRepo.create({ username, platform });
    return await this.userRepo.save(user);

  }

  async findOne(id: string): Promise<User | null> {

    return await this.userRepo.findOne({ where: { id } });

  }
  
}
