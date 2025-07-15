import { IsNotEmpty, IsUUID } from "class-validator"

export class OrderResDto {

    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    total: number

    @IsNotEmpty()
    status: string

    @IsNotEmpty()
    createdAt: string

    @IsNotEmpty()
    updatedAt: string
}