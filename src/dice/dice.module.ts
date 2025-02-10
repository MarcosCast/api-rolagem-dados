import { Module } from '@nestjs/common';
import { DiceController } from './dice.controller';
import { DiceService } from './dice.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [DiceController],
  providers: [DiceService],
})
export class DiceModule {}
