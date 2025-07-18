import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginReqDto {

    @ApiProperty({ example: "admin@example.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "test123@@" })
    @IsNotEmpty()
    password: string;
}