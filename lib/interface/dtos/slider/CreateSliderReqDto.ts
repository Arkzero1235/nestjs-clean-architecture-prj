import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateSliderReqDto {

    @ApiProperty({ example: "Main banner 1" })
    @IsNotEmpty()
    title: string

    @ApiProperty({ example: "https://shop.app/" })
    @IsNotEmpty()
    url: string

    @ApiProperty({ example: "https://vending-cdn.kootoro.com/torov-cms/upload/image/1669358914523-kh%C3%A1i%20ni%E1%BB%87m%20qu%E1%BA%A3ng%20c%C3%A1o%20banner%20tr%C3%AAn%20website.jpg" })
    @IsNotEmpty()
    image: string

    @ApiProperty({ example: "eead9e7c-4e87-4339-b0a0-03519c380c7b" })
    @IsNotEmpty()
    @IsUUID()
    adminId: string
}