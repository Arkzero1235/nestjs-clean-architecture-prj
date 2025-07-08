import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "lib/application/service/jwt/ITokenService";
import { LoginDto } from "lib/domain/dto/LoginDto";
import { AuthRepository } from "lib/domain/repository/AuthRepository";
import { UserRepository } from "lib/domain/repository/UserRepository";
import { ApiResponseHelper } from "lib/helper/response-helper";


@Injectable()
export class AuthUseCase {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository,
        @Inject('ITokenService') private readonly tokenService: TokenService
    ) { }

    // Use case: Đăng nhập
    async login(loginDto: LoginDto): Promise<object> {

        const user = await this.userRepository.checkEmail(loginDto.email);

        if (!user) {
            throw new NotFoundException("Account is not found")
        }

        const isValid: boolean = await this.authRepository.validatePassword(loginDto.password, user.passwordHash);

        if (!isValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = {
            id: user.id,
            username: user.userName,
            role: user.role
        }

        const accessToken = this.tokenService.sign(payload);

        return ApiResponseHelper.success(
            "Login successed",
            {
                sub: user.id,
                username: user.userName,
                token: accessToken
            },
            200
        )
    }
}