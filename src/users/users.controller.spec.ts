import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {

  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({

      controllers: [UsersController],
      providers: [
        {

          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: '1', username: 'Jogador1', platform: 'PC', createdAt: new Date() }),
            findOne: jest.fn().mockResolvedValue({ id: '1', username: 'Jogador1', platform: 'PC', createdAt: new Date() }),

          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

  });

  it('Deve ser definido', () => {

    expect(controller).toBeDefined();

  });

  it('Deve criar um usuário', async () => {

    const result = await controller.create({ username: 'Jogador1', platform: 'PC' });
    expect(result).toEqual({ id: '1', username: 'Jogador1', platform: 'PC', createdAt: expect.any(Date) });

  });

  it('Deve encontrar um usuário pelo ID', async () => {

    const result = await controller.findOne('1');
    expect(result).toEqual({ id: '1', username: 'Jogador1', platform: 'PC', createdAt: expect.any(Date) });
    
  });
});
