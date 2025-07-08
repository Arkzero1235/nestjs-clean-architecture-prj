import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class FullUserDto {

    @IsUUID()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole

    createdAt: Date

    updatedAt?: Date
}