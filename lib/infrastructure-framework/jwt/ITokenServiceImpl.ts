import { ITokenService } from "lib/domain-core/services/ITokenService";
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ITokenServiceImpl implements ITokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    generateAccessToken(payload: any): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
        });
    }

    generateRefreshToken(payload: any): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        });
    }

    verifyAccessToken(token: string) {
        return this.jwtService.verify(token, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
    }
    
    verifyRefreshToken(token: string) {
        return this.jwtService.verify(token, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
    }


}