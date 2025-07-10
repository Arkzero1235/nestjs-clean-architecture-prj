import { LoginDto } from "lib/domain/dtos/user/LoginDto";
import { LoginReqDto } from "../dtos/LoginReqDto";

export class LoginDtoMapper {
    static map(LoginReqDto: LoginReqDto): LoginDto {
        return {
            email: LoginReqDto.email,
            password: LoginReqDto.password,
        }
    }
}