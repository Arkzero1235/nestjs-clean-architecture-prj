import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator"

export class UpdateSliderReqDto {

    @ApiProperty({ example: "Main banner x" })
    @IsOptional()
    title?: string

    @ApiProperty({ example: "https://f5fruitshop.vn/" })
    @IsOptional()
    url?: string

    @ApiProperty({ example: "https://www.diagnosisdiet.com/assets/images/6/fruit-og-z8vk4201s653efw.jpg" })
    @IsOptional()
    image?: string

    @ApiProperty({ example: "eead9e7c-4e87-4339-b0a0-03519c380c7b" })
    @IsNotEmpty()
    @IsUUID()
    adminId: string
}