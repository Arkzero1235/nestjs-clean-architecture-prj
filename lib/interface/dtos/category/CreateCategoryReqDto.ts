import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryReqDto {

    @ApiProperty({ example: "Điện tử" })
    @IsNotEmpty()
    name: string;
}