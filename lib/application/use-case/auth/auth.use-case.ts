import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "lib/domain-core/dtos/LoginDto";
import { AuthRepository } from "lib/domain-core/repositories/AuthRepository";
import { UserRepository } from "lib/domain-core/repositories/UserRepository";
import { ITokenService } from "lib/domain-core/services/ITokenService";

@Injectable()
export class AuthUseCase {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository,
        private iTokenService: ITokenService
    ) { }

    // Usecase: Đăng nhập
    async login(loginDto: LoginDto) {

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

        const accessToken = this.iTokenService.generateAccessToken(payload);

        const refreshToken = this.iTokenService.generateRefreshToken(payload);

        return { id: user.id, accessToken, refreshToken }
    }

    // Usecase: Đăng xuất
    async logout() {
        return "Logout successed"
    }

    // Usecase: Cấp lại access token
    async refresh(token: string): Promise<string> {
        const payload = this.iTokenService.verifyRefreshToken(token);
        return this.iTokenService.generateAccessToken({ payload });
    }
}