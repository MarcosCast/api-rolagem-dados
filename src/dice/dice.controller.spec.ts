import { Test, TestingModule } from '@nestjs/testing';
import { DiceController } from './dice.controller';
import { DiceService } from './dice.service';

describe('DiceController', () => {

  let controller: DiceController;
  let service: DiceService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({

      controllers: [DiceController],
      providers: [
        {
          provide: DiceService,
          
          useValue: {
            rollDice: jest.fn().mockResolvedValue(18),
            getLastRoll: jest.fn().mockResolvedValue(18),

          },
        },
      ],
    }).compile();

    controller = module.get<DiceController>(DiceController);
    service = module.get<DiceService>(DiceService);

  });

  it('Deve ser definido', () => {

    expect(controller).toBeDefined();

  });

  it('Deve retornar um valor de rolagem', async () => {

    const result = await controller.rollDice('user-id', 'd20', '1', '0', '0', undefined);
    expect(result).toEqual({ total: 18 });

  });

  it('Deve retornar a última rolagem', async () => {

    expect(await controller.getLastRoll()).toEqual({ total: 18 });
    
  });
});
