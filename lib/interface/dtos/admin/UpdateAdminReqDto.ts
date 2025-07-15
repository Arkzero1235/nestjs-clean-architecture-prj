import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";

export class UpdateAdminReqDto {

    @ApiProperty({ example: "Admin renew" })
    @IsOptional()
    name: string;

    @ApiProperty({ example: "Admin001@gmail.com" })
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Admin123@@" })
    @IsOptional()
    password: string;

    @ApiProperty({ example: "0966587911" })
    @IsOptional()
    phone: string;
}