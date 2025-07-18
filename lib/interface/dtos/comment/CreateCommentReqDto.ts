import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCommentReqDto {

    @ApiProperty({ example: "2d011518-d44f-4957-975c-54fdf88f28a8" })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({ example: "Xin chào, tôi cần hỗ trợ" })
    @IsNotEmpty()
    content: string;
}