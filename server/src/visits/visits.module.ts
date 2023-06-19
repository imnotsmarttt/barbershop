import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {Visit} from "./visit.entity";
import {VisitsController} from './controllers/visits.controller';
import {VisitsService} from './services/visits.service';
import {EmployeeModule} from "employee/employee.module";
import {ServicesModule} from "services/services.module";
import {RankModule} from "rank/rank.module";
import {UsersModule} from "users/users.module";
import {BranchModule} from "branch/branch.module";
import {CommonModule} from "common/common.module";
import {VisitsAdminController} from "./controllers/visits.admin.controller";
import {EmployeeHelperService} from "employee/services/employee.helper.service";

@Module({
    imports: [
        forwardRef(() => EmployeeModule),
        ServicesModule,
        CommonModule,
        BranchModule,
        RankModule,
        UsersModule,
        TypeOrmModule.forFeature([Visit])
    ],
    exports: [VisitsService, TypeOrmModule],
    controllers: [VisitsController, VisitsAdminController],
    providers: [
        VisitsService,
        EmployeeHelperService
    ]
})
export class VisitsModule {
}
