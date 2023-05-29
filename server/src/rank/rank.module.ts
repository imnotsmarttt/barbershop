import {Module} from '@nestjs/common';
import {RankService} from './rank.service';
import {RankController} from './rank.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rank} from "./rank.entity";
import {RankAdminController} from "./rank.admin.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Rank])],
    providers: [RankService, RankAdminController],
    controllers: [RankController],
    exports: [RankService, TypeOrmModule]
})
export class RankModule {
}
