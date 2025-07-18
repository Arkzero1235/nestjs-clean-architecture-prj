import { BadRequestException, CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private readonly logger: Logger,
        private readonly jwtService: JwtService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            this.logger.error('Authorization header missing or malformed', '', 'At authenticationGuard');
            throw new UnauthorizedException('Token missing or malformed');
        }

        const token = authHeader.split(' ')[1];

        const decoded = this.jwtService.verify(token); // throw nếu expired
        request.user = decoded; // Gán vào request để controller hoặc decorator khác dùng

        this.logger.log('Authentication success', 'At authenticationGuard');

        return true;

    }
}
