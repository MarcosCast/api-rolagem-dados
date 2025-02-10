import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class DiceService {
  private readonly REDIS_LAST_ROLL_KEY = 'lastDiceRoll';

  constructor(private readonly redisService: RedisService) {}

  async rollDice(faces: number): Promise<number> {

    const result = Math.floor(Math.random() * faces) + 1;
    await this.redisService.getClient().set(this.REDIS_LAST_ROLL_KEY, result);
    return result;

  }

  async getLastRoll(): Promise<number | null> {

    const value = await this.redisService.getClient().get(this.REDIS_LAST_ROLL_KEY);
    if (!value) return null;
    return parseInt(value, 10);
    
  }
}
