import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {JWT_SECRET_KEY} from "../../config";

import {LocalStrategy} from "./strategy/local.strategy";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
  imports: [
      UsersModule,
      JwtModule.register({
        secret: JWT_SECRET_KEY,
        global: true,
        signOptions: {
          expiresIn: '60m'
        }
      })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
