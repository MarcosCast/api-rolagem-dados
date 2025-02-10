import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { DiceModule } from './dice/dice.module';

@Module({
  imports: [RedisModule, DiceModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
