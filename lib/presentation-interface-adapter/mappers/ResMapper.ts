import { ResponseUserDto } from "lib/domain-core/dtos/ResponseUserDto";
import { ResDto } from "../dtos/ResDto";

export class ResMapper {

    static mapResData(ormData: object): object {
        return ormData;
    }

    static mapCreatedData(ormData: any): ResDto {
        return {
            id: ormData.id,
            username: ormData.userName,
            email: ormData.email,
            role: ormData.role
        }
    }

    static mapResponseDto(ormData: any): ResponseUserDto {
        return {
            id: ormData.id,
            userName: ormData.userName,
            email: ormData.email,
            passwordHash: ormData.passwordHash,
            role: ormData.role
        }
    }

}

