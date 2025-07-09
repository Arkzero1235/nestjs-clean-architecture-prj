import { LoginDto } from "lib/domain-core/dtos/LoginDto";
import { LoginReqDto } from "lib/presentation-interface-adapter/dtos/LoginReqDto";

export class LoginDtoMapper {
    static map(LoginReqDto: LoginReqDto): LoginDto {
        return {
            email: LoginReqDto.email,
            password: LoginReqDto.password,
        }
    }
}