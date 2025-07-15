import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator"

export class UpdateOrderDetailReqDto {
    @IsUUID()
    @IsNotEmpty()
    orderId: string

    @IsUUID()
    @IsNotEmpty()
    productId: string

    @IsOptional()
    @IsNumber()
    quantity: number

    @IsOptional()
    @IsNumber()
    price: number

    @IsOptional()
    status: string
}