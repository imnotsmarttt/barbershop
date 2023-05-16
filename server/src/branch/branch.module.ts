import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Branch} from "./branch.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Branch])],
    exports: [TypeOrmModule]
})
export class BranchModule {}
