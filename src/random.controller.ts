import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';

@Controller('random')
export class RandomController {
  @Post()
  getRandomNumber(): { value: number } {
    try {
      const randomValue = Math.floor(Math.random() * 100) + 1;
      return { value: randomValue };
    } catch (error) {
      throw new HttpException('Error generating random number', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
