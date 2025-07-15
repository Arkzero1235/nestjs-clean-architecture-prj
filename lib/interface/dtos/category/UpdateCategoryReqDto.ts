import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateCategoryReqDto {

    @ApiProperty({ example: "Đồ uống" })
    @IsOptional()
    name?: string;
}