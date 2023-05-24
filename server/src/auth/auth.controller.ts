import {Controller, Post, Get, Body, UseGuards, Req} from '@nestjs/common';
import {LoginDto, RegisterDto} from "./auth.dto";
import {AuthService} from "./auth.service";
import {LocalGuard} from "./guards/local.guard";
import {JwtGuard} from "./guards/jwt.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req) {
        return await this.authService.login(req.user)
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        return await this.authService.register(body)
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async me(@Req() req) {
        return await this.authService.checkAuth(req.user)
    }
}
