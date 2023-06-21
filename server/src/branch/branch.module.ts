import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Branch} from "./branch.entity";
import {BranchService} from "./services/branch.service";
import {BranchController} from './controllers/branch.controller';
import {BranchAdminController} from "./controllers/branch.admin.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Branch])
    ],
    providers: [
        BranchService
    ],
    exports: [
        BranchService,
        TypeOrmModule
    ],
    controllers: [
        BranchController,
        BranchAdminController
    ]
})
export class BranchModule {
}
