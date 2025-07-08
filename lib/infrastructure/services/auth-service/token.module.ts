import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './token.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your-secret-key',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [
        {
            provide: 'TokenService',
            useClass: JwtTokenService,
        },
    ],
    exports: ['TokenService'],
})
export class TokenModule { }
