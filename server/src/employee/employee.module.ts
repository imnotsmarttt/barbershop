import {Module} from '@nestjs/common';
import {EmployeeController} from './employee.controller';
import {EmployeeService} from './employee.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Employee} from "./employee.entity";
import {RankModule} from "../rank/rank.module";
import {UsersModule} from "../users/users.module";
import {BranchModule} from "../branch/branch.module";

@Module({
    imports: [
        RankModule,
        UsersModule,
        BranchModule,
        TypeOrmModule.forFeature([Employee])
    ],
    controllers: [EmployeeController],
    providers: [EmployeeService],
    exports: [EmployeeService, TypeOrmModule]
})
export class EmployeeModule {
}
