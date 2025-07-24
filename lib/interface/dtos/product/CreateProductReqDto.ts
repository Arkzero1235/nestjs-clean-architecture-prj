import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator"

export class CreateProductReqDto {

    @ApiProperty({ example: "Quần Jean unisex" })
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: 50000 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number

    @ApiProperty({ example: "https://zizoou.com/cdn/shop/products/Quan-Baggy-Jean-nam-nu-2b-2-Quan-ong-rong-xanh-classic-ZiZoou-Store.jpg?v=1680283265&width=1946" })
    @IsNotEmpty()
    image: string

    @ApiProperty({ example: 20 })
    @IsNotEmpty()
    @Min(0)
    @IsNumber()
    stock: number

    @ApiProperty({ example: "Quần Jean unisex phù hợp mọi giới tính, form rộng, thời trang" })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 500 })
    @IsNotEmpty()
    @Min(0)
    @IsNumber()
    storage: number

    @ApiProperty({ example: "86313151-9cab-4001-874d-ea1936af9805" })
    @IsNotEmpty()
    @IsUUID()
    categoryId: string
}