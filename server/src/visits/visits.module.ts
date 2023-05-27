import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {Visit} from "./visit.entity";
import {VisitsController} from './visits.controller';
import {VisitsService} from './visits.service';
import {EmployeeModule} from "../employee/employee.module";
import {ServicesModule} from "../services/services.module";
import {RankModule} from "../rank/rank.module";
import {UsersModule} from "../users/users.module";
import {BranchModule} from "../branch/branch.module";
import {ServicesService} from "../services/services.service";
import {CommonModule} from "../common/common.module";

@Module({
    imports: [
        forwardRef(() => EmployeeModule),
        ServicesModule,
        CommonModule,
        TypeOrmModule.forFeature([Visit])
    ],
    exports: [VisitsService, TypeOrmModule],
    controllers: [VisitsController],
    providers: [VisitsService]
})
export class VisitsModule {
}
