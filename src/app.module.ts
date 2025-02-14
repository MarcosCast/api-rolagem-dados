import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { DiceModule } from './dice/dice.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiceType } from './entities/dice-type.entity';
import { Roll } from './entities/roll.entity';
import { User } from './entities/user.entity';

@Module({

  imports: [

    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [DiceType, Roll, User],
      synchronize: false
    }),
    RedisModule,
    DiceModule,
    UsersModule,

  ],

  controllers: [AppController],
  providers: [AppService],
  
})

export class AppModule {}
