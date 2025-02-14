import { Module } from '@nestjs/common';
import { DiceController } from './dice.controller';
import { DiceService } from './dice.service';
import { RedisModule } from '../redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiceType } from '../entities/dice-type.entity';
import { Roll } from '../entities/roll.entity';
import { User } from '../entities/user.entity';
@Module({

  imports: [RedisModule, TypeOrmModule.forFeature([DiceType, Roll, User])],
  controllers: [DiceController],
  providers: [DiceService],

})

export class DiceModule {}
