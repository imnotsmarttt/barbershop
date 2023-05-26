import {Body, Controller, Param, Post, Put} from '@nestjs/common';
import {VisitsService} from "./visits.service";
import {CreateOrUpdateVisitDto} from "./visit.dto";

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) {}

    @Post()
    async create(@Body() body: CreateOrUpdateVisitDto) {
        return await this.visitsService.create(body)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: CreateOrUpdateVisitDto) {
        return await this.visitsService.update(id, body)
    }
}
