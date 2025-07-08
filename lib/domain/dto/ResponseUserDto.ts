import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ResponseUserDto {

    @IsUUID()
    id: string

    @IsNotEmpty()
    @IsString()
    userName: string

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    passwordHash: string

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole
}