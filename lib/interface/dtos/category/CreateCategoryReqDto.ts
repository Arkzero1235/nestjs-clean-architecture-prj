import { IsNotEmpty } from "class-validator";

export class CreateCategoryReqDto {

    @IsNotEmpty()
    name: string;
}