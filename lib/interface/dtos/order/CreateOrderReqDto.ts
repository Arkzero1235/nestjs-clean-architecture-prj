import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateOrderReqDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    status: string = "PENDING";
}