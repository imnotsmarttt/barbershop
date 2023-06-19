import {Module} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {AuthController} from './controllers/auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

import {LocalStrategy} from "./strategy/local.strategy";
import {JwtAccessStrategy} from "./strategy/jwt-access.strategy";
import {JwtRefreshStrategy} from "./strategy/jwt-refresh.strategy"
import {AuthHelperService} from "./services/auth.helper.service";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({global: true})
    ],
    providers: [
        AuthService,
        AuthHelperService,
        LocalStrategy,
        JwtAccessStrategy,
        JwtRefreshStrategy
    ],
    controllers: [AuthController]
})
export class AuthModule {
}
