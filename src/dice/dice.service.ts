import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiceType } from '../entities/dice-type.entity';
import { Roll } from '../entities/roll.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class DiceService {
  private readonly REDIS_LAST_ROLL_KEY = 'lastDiceRoll';

  constructor(

    private readonly redisService: RedisService,
    @InjectRepository(DiceType)
    private readonly diceTypeRepo: Repository<DiceType>,
    @InjectRepository(Roll)
    private readonly rollRepo: Repository<Roll>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

  ) {}

  async rollDice(

    userId: string,
    diceName: string,
    quantity: number,
    bonus: number = 0,
    penalty: number = 0,
    customSides?: number,

  ): Promise<number> {

    let sides: number;

    if (diceName === 'custom' && customSides) {

      sides = customSides;

    } else {

      const diceType = await this.diceTypeRepo.findOne({ where: { name: diceName } });

      if (!diceType) throw new Error('Dice type not found');
      sides = diceType.sides;

    }

    let total = 0;

    for (let i = 0; i < quantity; i++) {

      total += Math.floor(Math.random() * sides) + 1;

    }

    total = total + bonus - penalty;

    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new Error('User not found');

    let diceTypeForRoll = null;

    if (diceName === 'custom') {

      diceTypeForRoll = await this.diceTypeRepo.findOne({ where: { name: 'custom' } });

      if (!diceTypeForRoll) {

        if (!customSides) throw new Error('Custom sides not provided');
        diceTypeForRoll = this.diceTypeRepo.create({ id: 0, name: 'custom', sides: customSides });

      }

    } else {

      diceTypeForRoll = await this.diceTypeRepo.findOne({ where: { name: diceName } });
      if (!diceTypeForRoll) throw new Error('Dice type not found');

    }

    const roll = this.rollRepo.create({

      user: user,
      dice: diceTypeForRoll,
      result: total,

    });

    await this.rollRepo.save(roll);
    await this.redisService.getClient().set(this.REDIS_LAST_ROLL_KEY, total.toString());
    return total;

  }

  async getLastRoll(): Promise<number | null> {

    const value = await this.redisService.getClient().get(this.REDIS_LAST_ROLL_KEY);
    if (!value) return null;
    return parseInt(value, 10);

  }
  
}
