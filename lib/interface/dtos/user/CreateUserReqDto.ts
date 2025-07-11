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

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phone: string;

    @IsString()
    role: string
}