import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateReqDto {

    @IsNotEmpty()
    userName: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @IsString()
    role: string
}