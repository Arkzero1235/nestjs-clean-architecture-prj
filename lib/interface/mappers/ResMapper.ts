import { ResponseUserDto } from "lib/domain/dtos/user/ResponseUserDto";
import { ResUserDto } from "../dtos/user/ResUserDto";
import { ResponseAdminDto } from "lib/domain/dtos/admin/ResponseAdminDto";

export class ResMapper {

    static mapResData(ormData: object): object {
        return ormData;
    }

    static mapCreatedUserData(ormData: any): ResUserDto {
        return {
            id: ormData.id,
            username: ormData.userName,
            email: ormData.email,
            role: ormData.role
        }
    }

    static mapResponseUserDto(ormData: any): ResponseUserDto {
        return {
            id: ormData.id,
            userName: ormData.userName,
            email: ormData.email,
            passwordHash: ormData.passwordHash,
            address: ormData.address,
            role: ormData.role
        }
    }

    static mapResponseAdminDto(ormData: any): ResponseAdminDto {
        return {
            id: ormData.id,
            email: ormData.email,
            name: ormData.name,
            password: ormData.password,
            phone: ormData.phone
        }
    }

}

