import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class UpdateOrderReqDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    status: string = "PENDING";
}