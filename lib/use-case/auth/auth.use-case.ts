import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { time } from "console";
import { LoginDto } from "lib/domain/dtos/user/LoginDto";
import { AdminRepository } from "lib/domain/repositories/AdminRepository";
import { AuthRepository } from "lib/domain/repositories/AuthRepository";
import { UserRepository } from "lib/domain/repositories/UserRepository";
import { ITokenService } from "lib/domain/services/ITokenService";

@Injectable()
export class AuthUseCases {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository,
        private adminRepository: AdminRepository,
        private iTokenService: ITokenService,
        private readonly logger: Logger
    ) { }

    // Usecase: Đăng nhập người dùng
    async login(loginDto: LoginDto) {
        // Check existing user
        const user = await this.userRepository.checkEmail(loginDto.email);

        // Log error
        if (!user) {
            this.logger.error("Cannot find user", undefined, "At login usecase");
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

        const time: any = process.env.JWT_ACCESS_EXPIRES_IN;

        // Log result
        if (accessToken && refreshToken && isValid) {
            this.logger.log("Login success", "At auth usecases");
        }

        return { id: user.id, time: time, username: user.username, accessToken, refreshToken }
    }

    // Usecase: Đăng nhập admin
    async loginAdmin(loginDto: LoginDto) {
        // Check existing admin
        const admin = await this.adminRepository.checkMail(loginDto.email);

        // Log error
        if (!admin) {
            this.logger.error("Cannot find admin", undefined, "At login usecase");
            throw new NotFoundException("Cannot find admin");
        }

        // Validate password
        const isValid: boolean = await this.authRepository.validatePassword(loginDto.password, admin.password);

        if (!isValid) {
            this.logger.error("Password is not correct", undefined, "At login usecase");
            throw new UnauthorizedException("Invalid credentials");
        }

        // Init payload for token
        const payload = {
            id: admin.id,
            name: admin.name,
            role: admin.role
        }

        // Create token
        const accessToken = this.iTokenService.generateAccessToken(payload);

        const refreshToken = this.iTokenService.generateRefreshToken(payload);

        const time: any = process.env.JWT_ACCESS_EXPIRES_IN;

        // Log result
        if (accessToken && refreshToken && isValid) {
            this.logger.log("Login admin success", "At auth usecases");
        }

        return { id: admin.id, time: time, name: admin.name, accessToken, refreshToken }
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

        let payload: { id: string, name: string, role: string };
        try {
            payload = this.iTokenService.verifyRefreshToken(token); // token expired / invalid sẽ ném lỗi ở đây
        } catch (err) {
            this.logger.error("Invalid or expired refresh token", err.stack, "At auth usecases");
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        this.logger.log("Renew token success", "At auth usecases");

        return this.iTokenService.generateAccessToken({
            id: payload.id,
            name: payload.name,
            role: payload.role
        });
    }
}