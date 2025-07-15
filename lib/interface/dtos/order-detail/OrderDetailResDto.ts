import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator"

export class OrderDetailResDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    orderId: string

    @IsUUID()
    @IsNotEmpty()
    productId: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsOptional()
    status?: string

    @IsNotEmpty()
    createdAt: string
}