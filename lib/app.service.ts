import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: `You didn't say that when you sucked my DICK!!!`
    };
  }
}
