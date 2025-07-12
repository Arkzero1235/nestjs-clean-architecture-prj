import { Controller, Get, Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: "Ping server" })
  @ApiOkResponse({
    description: "A message from server",
    schema: {
      example: {
        message: "You didn't say that when you sucked my DICK!!!"
      }
    }
  })
  @ApiInternalServerErrorResponse({ description: "Server error" })
  getHello(): object {
    return this.appService.getHello();
  }
}
