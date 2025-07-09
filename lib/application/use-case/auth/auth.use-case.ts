import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "lib/domain/services/jwt/ITokenService";
import { LoginDto } from "lib/application/dtos/LoginDto";
import { AuthRepository } from "lib/domain/repositories/AuthRepository";
import { UserRepository } from "lib/domain/repositories/UserRepository";
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