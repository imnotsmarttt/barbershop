import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Service} from "./services.entity";
import {ServicesService} from './services.service';
import {ServicesController} from './services.controller';
import {RankModule} from "../rank/rank.module";

@Module({
    imports: [
        RankModule,
        TypeOrmModule.forFeature([Service])
    ],
    exports: [ServicesService, TypeOrmModule],
    providers: [ServicesService],
    controllers: [ServicesController]
})
export class ServicesModule {
}
