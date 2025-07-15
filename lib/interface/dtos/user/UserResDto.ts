import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsUUID } from "class-validator";

export class UserResDto {

    @ApiProperty({ example: "b32c439a-7f7a-4a17-ab16-73342f669260" })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: "Pansysthm3112" })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: "buixuandung309@gmail.com" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Hà Nội" })
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: "0966587913" })
    @IsNotEmpty()
    @IsPhoneNumber("VN")
    phone: string;

    @ApiProperty({ example: "$argon2id$v=19$m=65536,t=3,p=4$MODrO9TAAQ/roZ88vZdpRQ$XNyb+3xddOUzCOMFelk+fswhfamDx9aK+QDQDLiSjis" })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: "CLIENT" })
    @IsNotEmpty()
    role: string;

    @ApiProperty({ example: "2025-07-10T16:55:03.601Z" })
    @IsNotEmpty()
    createdAt: string;

    @ApiProperty({ example: "2025-07-10T16:55:03.601Z" })
    @IsNotEmpty()
    updatedAt: string;
}