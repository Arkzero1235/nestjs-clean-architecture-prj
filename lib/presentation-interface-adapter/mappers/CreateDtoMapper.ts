import { CreateUserDto } from "lib/domain-core/dtos/CreateUserDto";
import { UserRoleMapper } from "lib/presentation-interface-adapter/mappers/UserRoleMapper";
import { CreateReqDto } from "lib/presentation-interface-adapter/dtos/CreateReqDto";

export class CreateDtoMapper {
    static map(createReqDto: CreateReqDto): CreateUserDto {
        return {
            username: createReqDto.userName,
            email: createReqDto.email,
            password: createReqDto.password,
            role: UserRoleMapper.map(createReqDto.role)
        }
    }
}