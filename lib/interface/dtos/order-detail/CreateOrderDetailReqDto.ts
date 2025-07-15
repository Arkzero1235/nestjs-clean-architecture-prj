import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator"

export class CreateOrderDetailReqDto {

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
    @IsNumber()
    total: number
}