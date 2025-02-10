import { Controller, Get, Query } from '@nestjs/common';
import { DiceService } from './dice.service';

@Controller('dice')
export class DiceController {
  constructor(private readonly diceService: DiceService) {}

  @Get('roll')
  rollDice(@Query('faces') faces: string) {
    return this.diceService.rollDice(parseInt(faces, 10));
  }

  @Get('last-roll')
  getLastRoll() {
    return this.diceService.getLastRoll();
  }
}
