import { BadRequestException, CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private readonly logger: Logger,
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const userIdInReq = request.params.userId;
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            this.logger.error('Authorization header missing or malformed', '', 'At AuthorizationGuard');
            throw new UnauthorizedException('Token missing or malformed');
        }

        const token = authHeader.split(' ')[1];

        const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(), // get ở method
            context.getClass() // sau đó get ở class
        ]);

        const decode = this.jwtService.verify(token);

        const userRole = decode.role;

        if (!requireRoles || !Array.isArray(requireRoles)) {
            this.logger.error('No roles defined for this route', '', 'At AuthorizationGuard');
            throw new UnauthorizedException('Access control not properly configured');
        }

        if (!requireRoles.includes(userRole)) {
            this.logger.error('Access denied', '', 'At AuthorizationGuard');
            throw new UnauthorizedException("You don't have permission to access this API");
        }

        if (requireRoles.includes(userRole)) {
            this.logger.log('Authorization success', 'At AuthorizationGuard');
        }

        // if (userIdInReq) {
        //     console.log("Req id: ", userIdInReq);

        //     console.log("Token id: ", decode.id);
        // }

        if (userIdInReq && userIdInReq !== decode.id && userRole !== "ADMIN") {
            this.logger.error("This is not your ID", undefined, "At AuthorizationGuard");
            throw new BadRequestException("This is not your ID");
        }

        return true;

    }

}