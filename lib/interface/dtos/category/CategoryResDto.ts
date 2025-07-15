import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CategoryResDto {

    @ApiProperty({ example: "40135726-5b8e-4795-a256-6f49424e8e01" })
    @IsUUID()
    @IsNotEmpty()
    id: string

    @ApiProperty({ example: "Điện tử" })
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: "2025-07-15 15:13:57.718" })
    @IsNotEmpty()
    createdAt: string
}