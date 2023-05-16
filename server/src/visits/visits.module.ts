import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {Visit} from "./visit.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Visit])],
    exports: [TypeOrmModule]
})
export class VisitsModule {}
