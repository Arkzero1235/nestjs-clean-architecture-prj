import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginReqDto {

    @ApiProperty({ example: "buixuandung309@gmail.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "Dung123@@" })
    @IsNotEmpty()
    password: string;
}