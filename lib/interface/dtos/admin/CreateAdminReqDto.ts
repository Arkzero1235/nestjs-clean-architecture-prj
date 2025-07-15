import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAdminReqDto {

    @ApiProperty({ example: "Server admin 01" })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "Admin01@gmail.com" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Admin123@@" })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: "0966587913" })
    @IsNotEmpty()
    phone: string;
}