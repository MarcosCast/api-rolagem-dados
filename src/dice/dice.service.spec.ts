import { Test, TestingModule } from '@nestjs/testing';
import { DiceService } from './dice.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roll } from '../entities/roll.entity';
import { User } from '../entities/user.entity';
import { DiceType } from '../entities/dice-type.entity';
import { RedisService } from '../redis/redis.service';

describe('DiceService', () => {

  let service: DiceService;
  let mockDiceTypeRepo: { findOne: jest.Mock };
  let mockUserRepo: { findOne: jest.Mock };
  let mockRollRepo: { create: jest.Mock; save: jest.Mock };
  let mockRedisClient: { set: jest.Mock; get: jest.Mock };
  let mockRedisService: { getClient: () => typeof mockRedisClient };

  beforeEach(async () => {

    mockDiceTypeRepo = { findOne: jest.fn() };
    mockUserRepo = { findOne: jest.fn() };
    mockRollRepo = { create: jest.fn(), save: jest.fn() };
    mockRedisClient = { set: jest.fn(), get: jest.fn() };
    mockRedisService = { getClient: () => mockRedisClient };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiceService,

        {
          provide: getRepositoryToken(DiceType),
          useValue: mockDiceTypeRepo,

        },
        {

          provide: getRepositoryToken(User),
          useValue: mockUserRepo,

        },
        {

          provide: getRepositoryToken(Roll),
          useValue: mockRollRepo,

        },
        {

          provide: RedisService,
          useValue: mockRedisService,

        },
      ],
    }).compile();

    service = module.get<DiceService>(DiceService);

  });

  it('Deve ser definido', () => {

    expect(service).toBeDefined();

  });

  it('Deve retornar um valor de dado entre 1 e o número de lados', async () => {

    mockDiceTypeRepo.findOne.mockResolvedValue({ id: 1, name: 'd20', sides: 20 });

    mockUserRepo.findOne.mockResolvedValue({ id: 'user-id', username: 'TesteUser', platform: 'PC', createdAt: new Date() });

    mockRollRepo.create.mockImplementation((rollData) => rollData);
    mockRollRepo.save.mockResolvedValue({});

    const result = await service.rollDice('user-id', 'd20', 1);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(20);

  });

  it('Deve salvar a última rolagem no Redis', async () => {

    mockDiceTypeRepo.findOne.mockResolvedValue({ id: 1, name: 'd6', sides: 6 });
    mockUserRepo.findOne.mockResolvedValue({ id: 'user-id', username: 'TesteUser', platform: 'PC', createdAt: new Date() });
    mockRollRepo.create.mockImplementation((rollData) => rollData);
    mockRollRepo.save.mockResolvedValue({});

    await service.rollDice('user-id', 'd6', 1);
    expect(mockRedisClient.set).toHaveBeenCalled();

  });

  it('Deve retornar a última rolagem armazenada no Redis', async () => {

    mockRedisClient.get.mockResolvedValue('15');
    const lastRoll = await service.getLastRoll();
    expect(lastRoll).toBe(15);

  });
});
