import { IsEmail, IsOptional } from "class-validator";

export class UpdateAdminReqDto {
    @IsOptional()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    password: string;

    @IsOptional()
    phone: string;
}