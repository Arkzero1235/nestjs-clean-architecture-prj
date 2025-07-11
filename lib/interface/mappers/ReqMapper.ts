import { LoginDto } from "lib/domain/dtos/user/LoginDto";
import { LoginReqDto } from "../dtos/LoginReqDto";
import { CreateReqDto } from "../dtos/user/CreateUserReqDto";
import { CreateUserDto } from "lib/domain/dtos/user/CreateUserDto";
import { UserRoleMapper } from "./UserRoleMapper";
import { CreateAdminReqDto } from "../dtos/admin/CreateAdminReqDto";
import { CreateAdminDto } from "lib/domain/dtos/admin/CreateAdminDto";
import { UpdateAdminReqDto } from "../dtos/admin/UpdateAdminReqDto";
import { UpdateAdminDto } from "lib/domain/dtos/admin/UpdateAdminDto";

export class ReqMapper {
    static LoginMapper(LoginReqDto: LoginReqDto): LoginDto {
        return {
            email: LoginReqDto.email,
            password: LoginReqDto.password,
        }
    }

    static CreateUserMapper(createReqDto: CreateReqDto): CreateUserDto {
        return {
            username: createReqDto.userName,
            email: createReqDto.email,
            password: createReqDto.password,
            address: createReqDto.address,
            phone: createReqDto.phone,
            role: UserRoleMapper.map(createReqDto.role)
        }
    }

    static CreateAdminMapper(createAdminReqDto: CreateAdminReqDto): CreateAdminDto {
        return {
            email: createAdminReqDto.email,
            name: createAdminReqDto.name,
            password: createAdminReqDto.password,
            phone: createAdminReqDto.phone
        }
    }

    static UpdateAdminMapper(updateAdminReqDto: UpdateAdminReqDto): UpdateAdminDto {
        return {
            email: updateAdminReqDto.email,
            name: updateAdminReqDto.name,
            password: updateAdminReqDto.password,
            phone: updateAdminReqDto.phone
        }
    }
}