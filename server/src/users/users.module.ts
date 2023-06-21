import {Module} from '@nestjs/common';
import {UsersService} from './services/users.service';
import {UsersController} from './controllers/users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersRepository} from "./users.repository";
import {User} from "./users.entity";
import {UsersHelperService} from "./services/users.helper.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        UsersService,
        UsersHelperService,
        UsersRepository
    ],
    controllers: [UsersController],
    exports: [
        UsersService,
        UsersHelperService,
        UsersRepository,
        TypeOrmModule,
    ]
})
export class UsersModule {
}
