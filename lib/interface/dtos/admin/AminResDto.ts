import { IsNotEmpty, IsPhoneNumber, IsUUID } from "class-validator"

export class AdminResDto {

    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    name: string


    @IsNotEmpty()
    email: string


    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @IsPhoneNumber("VN")
    phone: string
}