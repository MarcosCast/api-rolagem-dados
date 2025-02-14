import { Controller, Get, Query } from '@nestjs/common';
import { DiceService } from './dice.service';

@Controller('dice')
export class DiceController {

  constructor(private readonly diceService: DiceService) {}

  @Get('roll')
  async rollDice(

    @Query('userId') userId: string,
    @Query('diceName') diceName: string,
    @Query('quantity') quantity: string,
    @Query('bonus') bonus?: string,
    @Query('penalty') penalty?: string,
    @Query('customSides') customSides?: string,

  ) {

    const total = await this.diceService.rollDice(

      userId,
      diceName,
      parseInt(quantity, 10),
      bonus ? parseInt(bonus, 10) : 0,
      penalty ? parseInt(penalty, 10) : 0,
      customSides ? parseInt(customSides, 10) : undefined,

    );

    return { total };

  }

  @Get('last-roll')
  async getLastRoll() {

    const total = await this.diceService.getLastRoll();
    return { total };

  }

}