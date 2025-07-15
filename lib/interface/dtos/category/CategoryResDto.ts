import { IsNotEmpty, IsUUID } from "class-validator"

export class CategoryResDto {

    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    createdAt: string

    @IsNotEmpty()
    updatedAt: string
}