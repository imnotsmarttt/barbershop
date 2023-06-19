import {Module} from '@nestjs/common';
import {RankService} from './services/rank.service';
import {RankController} from './controllers/rank.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rank} from "./rank.entity";
import {RankAdminController} from "./controllers/rank.admin.controller";
import {RankHelperService} from "./services/rank.helper.service";

@Module({
    imports: [TypeOrmModule.forFeature([Rank])],
    providers: [
        RankService,
        RankHelperService,
        RankAdminController
    ],
    controllers: [RankController],
    exports: [
        RankService,
        RankHelperService,
        TypeOrmModule
    ]
})
export class RankModule {
}
