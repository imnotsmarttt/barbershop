import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {Visit} from "./visit.entity";
import {VisitsController} from './visits.controller';
import {VisitsService} from './visits.service';
import {EmployeeModule} from "../employee/employee.module";
import {ServicesModule} from "../services/services.module";

@Module({
    imports: [
        EmployeeModule,
        ServicesModule,
        TypeOrmModule.forFeature([Visit])
    ],
    exports: [TypeOrmModule],
    controllers: [VisitsController],
    providers: [VisitsService]
})
export class VisitsModule {}
