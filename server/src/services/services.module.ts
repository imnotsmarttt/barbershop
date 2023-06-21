import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Service} from "./services.entity";
import {ServicesService} from './services/services.service';
import {ServicesController} from './controllers/services.controller';
import {RankModule} from "../rank/rank.module";
import {ServicesAdminController} from "./controllers/services.admin.controller";

@Module({
    imports: [
        RankModule,
        TypeOrmModule.forFeature([Service])
    ],
    exports: [
        ServicesService,
        TypeOrmModule
    ],
    providers: [
        ServicesService
    ],
    controllers: [
        ServicesController,
        ServicesAdminController
    ]
})
export class ServicesModule {
}
