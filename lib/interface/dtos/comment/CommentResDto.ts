import { IsNotEmpty, IsUUID } from "class-validator"

export class CommentResDto {

    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    content: string
}