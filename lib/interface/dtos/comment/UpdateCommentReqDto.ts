import { IsOptional } from "class-validator";

export class UpdateCommentReqDto {
    @IsOptional()
    content?: string;
}