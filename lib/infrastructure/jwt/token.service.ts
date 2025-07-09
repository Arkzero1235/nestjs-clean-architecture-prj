// lib/infrastructure/token/jwt-token.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'lib/domain/services/jwt/ITokenService';

@Injectable()
export class JwtTokenService implements TokenService {
    constructor(private readonly jwtService: JwtService) { }

    sign(payload: object): string {
        return this.jwtService.sign(payload);
    }

    verify(token: string): boolean {
        try {
            this.jwtService.verify(token);
            return true;
        } catch {
            return false;
        }
    }
}
