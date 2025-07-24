import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber } from "class-validator";

export class UpdateUserReqDto {

    @ApiProperty({ example: "Pansysthm31122000" })
    @IsOptional()
    username?: string;

    @ApiProperty({ example: "buixuandung3090@gmail.com" })
    @IsOptional()
    email?: string;

    @IsOptional()
    address: string;

    @IsOptional()
    @IsPhoneNumber("VN")
    phone: string

    @ApiProperty({ example: "CLIENT" })
    @IsOptional()
    role?: string;
}