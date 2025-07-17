import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator"

export class UpdateProductReqDto {
    @IsOptional()
    name?: string

    @IsOptional()
    @IsNumber()
    price?: number

    @IsOptional()
    image?: string

    @IsOptional()
    @IsNumber()
    stock?: number

    @IsOptional()
    description: string;

    @IsOptional()
    @IsNumber()
    storage?: number

    @IsNotEmpty()
    @IsUUID()
    categoryId: string
}