import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {RoleEnum} from "./roles.enum";
import {ROLES_KEY} from "./role.decorator";
import {JwtService} from "@nestjs/jwt";
import {JWT_SECRET_KEY} from "../config/config";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.getAllAndOverride<RoleEnum>(ROLES_KEY, [context.getHandler()])
        if (!requiredRole) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization?.split(' ')[1]
        if (!token) {
            return false
        }
        try {
            const payload = this.jwtService.verify(token, {publicKey: JWT_SECRET_KEY})
            return payload.role === requiredRole
        } catch (e) {
            return  false
        }
    }
}