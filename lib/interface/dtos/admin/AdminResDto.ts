import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsPhoneNumber, IsUUID } from "class-validator"

export class AdminResDto {

    @ApiProperty({ example: "2c06e2b4-314f-4b53-8d47-53a46e28ad5e" })
    @IsUUID()
    @IsNotEmpty()
    id: string

    @ApiProperty({ example: "Server admin 01" })
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: "Admin01@gmail.com" })
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: "$argon2id$v=19$m=65536,t=3,p=4$Kmjw9cFgdDuDa7OjgVbryQ$kc/ZKo9FpcqcXi6pqQc9c0wZfCQuEGrtCnfEQlSp02Y" })
    @IsNotEmpty()
    password: string

    @ApiProperty({ example: "0966587913" })
    @IsNotEmpty()
    @IsPhoneNumber("VN")
    phone: string

    @ApiProperty({ example: "ADMIN" })
    @IsNotEmpty()
    role: string
}