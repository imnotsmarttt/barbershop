import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Employee, Rank} from "./employee.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Rank])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [TypeOrmModule]
})
export class EmployeeModule {}
