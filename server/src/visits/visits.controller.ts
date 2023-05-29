import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {VisitsService} from "./visits.service";
import {CreateOrUpdateVisitDto} from "./visit.dto";

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.visitsService.findOne({id})
    }
}
