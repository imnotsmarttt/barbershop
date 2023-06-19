import {Controller, Post, Get, Body, UseGuards, Req} from '@nestjs/common';
import {RegisterBodyDto} from "auth/interfaces/auth.dto";
import {AuthService} from "auth/services/auth.service";
import {LocalGuard} from "auth/guards/local.guard";
import {JwtRefreshGuard} from "auth/guards/jwt-refresh.guard";
import {JwtAccessGuard} from "auth/guards/jwt-access.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }

    @Post('register')
    async register(@Body() body: RegisterBodyDto) {
        return await this.authService.register(body)
    }

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req) {
        return await this.authService.login(req.user)
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refreshTokens(@Req() req) {
        return await this.authService.refreshTokens(req.user.id, req.user.refreshToken)
    }

    @UseGuards(JwtAccessGuard)
    @Get('logout')
    async logout(@Req() req) {
        return await this.authService.logout(req.user.id)
    }

    @UseGuards(JwtAccessGuard)
    @Get('me')
    async me(@Req() req) {
        return req.user.id
    }
}
