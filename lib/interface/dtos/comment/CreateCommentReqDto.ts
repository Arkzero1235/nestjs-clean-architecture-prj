import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCommentReqDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    content: string;
}