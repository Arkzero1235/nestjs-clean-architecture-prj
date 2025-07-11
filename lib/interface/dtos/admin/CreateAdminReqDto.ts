import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAdminReqDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phone: string;
}