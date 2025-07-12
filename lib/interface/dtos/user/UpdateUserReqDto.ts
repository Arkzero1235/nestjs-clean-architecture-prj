import { IsOptional } from "class-validator";

export class UpdateUserReqDto {

    @IsOptional()
    username?: string;

    @IsOptional()
    email?: string;

    @IsOptional()
    role?: string;
}