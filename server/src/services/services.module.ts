import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Service} from "./services.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Service])],
    exports: [TypeOrmModule]
})
export class ServicesModule {}
