import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "lib/domain/dtos/user/LoginDto";
import { AuthRepository } from "lib/domain/repositories/AuthRepository";
import { UserRepository } from "lib/domain/repositories/UserRepository";
import { ITokenService } from "lib/domain/services/ITokenService";

@Injectable()
export class AuthUseCases {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository,
        private iTokenService: ITokenService,
        private readonly logger: Logger
    ) { }

    // Usecase: Đăng nhập
    async login(loginDto: LoginDto) {
        // Check existing user
        const user = await this.userRepository.checkEmail(loginDto.email);

        // Log error
        if (!user) {
            this.logger.error("Cannot found user", undefined, "At login usecase");
            throw new NotFoundException("Account is not found");
        }

        // Validate password
        const isValid: boolean = await this.authRepository.validatePassword(loginDto.password, user.password);

        if (!isValid) {
            this.logger.error("Password is not correct", undefined, "At login usecase");
            throw new UnauthorizedException("Invalid credentials");
        }

        // Init payload for token
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        }

        // Create token
        const accessToken = this.iTokenService.generateAccessToken(payload);

        const refreshToken = this.iTokenService.generateRefreshToken(payload);

        // Log result
        if (accessToken && refreshToken && isValid) {
            this.logger.log("Login success", "At auth usecases");
        }

        return { id: user.id, accessToken, refreshToken }
    }

    // Usecase: Đăng xuất
    async logout() {
        this.logger.log("Logout success", "At auth usecases")
        return "Logout successed"
    }

    // Usecase: Cấp lại access token
    async refresh(token: string): Promise<string> {
        if (!token) {
            this.logger.error("Missing refresh token | user haven't logined yet", undefined, "At auth usecases");
            throw new UnauthorizedException("Missing refresh token | user haven't logined yet");
        }

        const payload = this.iTokenService.verifyRefreshToken(token);

        this.logger.log("Renew token success", "At auth usecases")

        return this.iTokenService.generateAccessToken({ payload });
    }
}