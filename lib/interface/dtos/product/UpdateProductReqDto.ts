import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator"

export class UpdateProductReqDto {

    @ApiProperty({ example: "Mắt kính nam thời trang" })
    @IsOptional()
    name?: string

    @ApiProperty({ example: 45000 })
    @IsOptional()
    @IsNumber()
    price?: number

    @ApiProperty({ example: "https://cdn.tgdd.vn/hoi-dap/1421017/top-10-mat-kinh-nam-giam-gia-soc-tai-avaji-cac-chang-khong%20(14)-800x596.jpg" })
    @IsOptional()
    image?: string

    @ApiProperty({ example: 0 })
    @IsOptional()
    @IsNumber()
    stock?: number

    @ApiProperty({ example: "Mắt kính nam thời trang, sành điệu, gọn nhẹ, bảo hành 1 năm" })
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 230 })
    @IsOptional()
    @IsNumber()
    storage?: number

    @ApiProperty({ example: "" })
    @IsOptional()
    @IsUUID()
    categoryId?: string
}