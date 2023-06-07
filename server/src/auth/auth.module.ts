import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

import {LocalStrategy} from "./strategy/local.strategy";
import {JwtAccessStrategy} from "./strategy/jwt-access.strategy";
import {JwtRefreshStrategy} from "./strategy/jwt-refresh.strategy"

@Module({
    imports: [
        UsersModule,
        JwtModule.register({global: true})
    ],
    providers: [AuthService, LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy],
    controllers: [AuthController]
})
export class AuthModule {
}
