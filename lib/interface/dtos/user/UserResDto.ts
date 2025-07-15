import { IsEmail, IsNotEmpty, IsPhoneNumber, IsUUID } from "class-validator";

export class UserResDto {

    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsPhoneNumber("VN")
    phone: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    createdAt: string;

    @IsNotEmpty()
    updatedAt: string;
}