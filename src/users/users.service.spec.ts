import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

describe('UsersService', () => {

  let service: UsersService;
  let userRepo: Repository<User>;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));

  });

  it('Deve ser definido', () => {

    expect(service).toBeDefined();

  });

  it('Deve criar um usuário corretamente', async () => {

    const newUser = { id: '1', username: 'Jogador1', platform: 'PC', createdAt: new Date() };
    jest.spyOn(userRepo, 'create').mockReturnValue(newUser as any);
    jest.spyOn(userRepo, 'save').mockResolvedValue(newUser);
    const result = await service.create('Jogador1', 'PC');
    expect(result).toEqual(newUser);

  });

  it('Deve encontrar um usuário pelo ID', async () => {

    const user = { id: '1', username: 'Jogador1', platform: 'PC', createdAt: new Date() };
    jest.spyOn(userRepo, 'findOne').mockResolvedValue(user as any);
    const result = await service.findOne('1');
    expect(result).toEqual(user);
    
  });
});
