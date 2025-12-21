import { Controller, Post, Body, Injectable, UseGuards, Logger, Get, Param } from '@nestjs/common';
import { PayosService } from 'lib/use-case/pay/pay.service';
import { PayReqDto } from '../dtos/PayReqDto';
import { AuthenticationGuard } from 'lib/infrastructure/jwt/authentication.guard';
import { AuthorizationGuard } from 'lib/infrastructure/jwt/authorization.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'lib/infrastructure/jwt/roles.decorator';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(["CLIENT"])
@ApiBearerAuth()
@Controller('payos')
export class PayosController {
    constructor(
        private readonly payosService: PayosService,
    ) { }

    @Post('create-payment')
    async createPayment(@Body() body: PayReqDto) {
        return this.payosService.createPayment(body);
    }

    @Get('/:id')
    async getPaymentResult(@Param('id') id: number) {
        return this.payosService.getResult(id);
    }
}