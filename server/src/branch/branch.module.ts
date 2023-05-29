import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Branch} from "./branch.entity";
import {BranchService} from "./branch.service";
import {BranchController} from './branch.controller';
import {BranchAdminController} from "./branch.admin.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Branch])],
    providers: [BranchService],
    exports: [BranchService, TypeOrmModule],
    controllers: [BranchController, BranchAdminController]
})
export class BranchModule {
}
