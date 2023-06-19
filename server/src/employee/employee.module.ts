import {forwardRef, Module} from '@nestjs/common';

import {Employee} from "./employee.entity";

import {EmployeeController} from './controllers/employee.controller';
import {EmployeeAdminController} from "./controllers/employee.admin.controller";
import {EmployeeService} from './services/employee.service';

import {TypeOrmModule} from "@nestjs/typeorm";
import {RankModule} from "rank/rank.module";
import {UsersModule} from "users/users.module";
import {BranchModule} from "branch/branch.module";
import {VisitsModule} from "visits/visits.module";
import {ServicesModule} from "services/services.module";
import {CommonModule} from "common/common.module";
import {EmployeeHelperService} from "./services/employee.helper.service";


@Module({
    imports: [
        RankModule,
        UsersModule,
        BranchModule,
        forwardRef(() => VisitsModule),
        ServicesModule,
        CommonModule,
        TypeOrmModule.forFeature([Employee])
    ],
    controllers: [
        EmployeeController,
        EmployeeAdminController
    ],
    providers: [
        EmployeeService,
        EmployeeHelperService
    ],
    exports: [
        EmployeeService,
        TypeOrmModule
    ]
})
export class EmployeeModule {
}
