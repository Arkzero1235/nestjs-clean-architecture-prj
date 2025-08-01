import { IsString, IsNumber, IsEmail, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemDto {
    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}

export class PayReqDto {
    @IsNumber()
    orderCode: number;

    @IsNumber()
    amount: number;

    @IsString()
    description: string;

    @IsString()
    buyerName: string;

    @IsEmail()
    buyerEmail: string;

    @IsString()
    buyerPhone: string;

    @IsString()
    buyerAddress: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[];

    @IsString()
    cancelUrl: string;

    @IsString()
    returnUrl: string;

    @IsNumber()
    expiredAt: number;

    // @IsString()
    // signature: string;
}
