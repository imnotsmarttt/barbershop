import {Module} from '@nestjs/common';
import {UsersService} from './services/users.service';
import {UsersController} from './controllers/users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [
        UsersService,
        TypeOrmModule,
    ]
})
export class UsersModule {
}
