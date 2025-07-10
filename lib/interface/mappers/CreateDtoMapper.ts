import { CreateUserDto } from "lib/domain/dtos/user/CreateUserDto";
import { UserRoleMapper } from "./UserRoleMapper";
import { CreateReqDto } from "../dtos/CreateReqDto";

export class CreateDtoMapper {
    static map(createReqDto: CreateReqDto): CreateUserDto {
        return {
            username: createReqDto.userName,
            email: createReqDto.email,
            password: createReqDto.password,
            address: createReqDto.address,
            phone: createReqDto.phone,
            role: UserRoleMapper.map(createReqDto.role)
        }
    }
}