import {Controller, Post, Get, Body, UseGuards, Req} from '@nestjs/common';
import {RegisterDto} from "./auth.dto";
import {AuthService} from "./auth.service";
import {LocalGuard} from "./guards/local.guard";
import {JwtRefreshGuard} from "./guards/jwt-refresh.guard";
import {JwtAccessGuard} from "./guards/jwt-access.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req) {
        return await this.authService.login(req.user)
    }

    @UseGuards(JwtAccessGuard)
    @Get('logout')
    async logout(@Req() req) {
        return await this.authService.logout(req.user.id)
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        return await this.authService.register(body)
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refreshTokens(@Req() req) {
        return await this.authService.refreshTokens(req.user.id, req.user.refreshToken)
    }
}
