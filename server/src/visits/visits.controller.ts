import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {VisitsService} from "./visits.service";
import {CreateOrUpdateVisitDto} from "./visit.dto";
import {Roles} from "../role/role.decorator";
import {RoleEnum} from "../role/roles.enum";

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) {}

    @Post()
    async create(@Body() body: CreateOrUpdateVisitDto) {
        return await this.visitsService.create(body)
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.visitsService.findOne({id})
    }
}
