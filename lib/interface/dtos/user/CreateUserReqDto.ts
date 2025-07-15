import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUerReqDto {

    @ApiProperty({ example: "test user" })
    @IsNotEmpty()
    userName: string

    @ApiProperty({ example: "test123@gmail.com" })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({ example: "test123@@" })
    @IsNotEmpty()
    password: string

    @ApiProperty({ example: "HCM city" })
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: "0988588944" })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: "CLIENT" })
    @IsString()
    role: string
}