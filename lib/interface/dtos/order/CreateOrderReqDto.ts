import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateOrderReqDto {

    @ApiProperty({ example: "2d011518-d44f-4957-975c-54fdf88f28a8" })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({ example: "3327cd87-5740-4ff0-a79f-aaec52656ecb" })
    @IsNotEmpty()
    @IsUUID()
    productId: string;

    @ApiProperty({ example: 10 })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}