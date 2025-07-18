import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCommentReqDto {

    @ApiProperty({ example: "" })
    @IsNotEmpty()
    content: string;
}