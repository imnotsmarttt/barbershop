import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {VisitsService} from "./visits.service";
import {CreateOrUpdateVisitDto} from "./visit.dto";
import {RolesGuard} from "../role/roles.guard";
import {JwtAccessGuard} from "../auth/guards/jwt-access.guard";
import {Roles} from "../role/role.decorator";
import {RoleEnum} from "../role/roles.enum";

@UseGuards(RolesGuard, JwtAccessGuard)
@Controller('admin/visits')
export class VisitsAdminController {
    constructor(private readonly visitsService: VisitsService) {}

    @Roles(RoleEnum.admin)
    @Get()
    async getAll(@Query() query) {
        return this.visitsService.getAll(query)
    }

    @Roles(RoleEnum.admin)
    @Put(':id')
    async update(@Param('id') id: number, @Body() body: CreateOrUpdateVisitDto) {
        return await this.visitsService.update(id, body)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.visitsService.delete(id)
        return {
            statusCode: HttpStatus.OK,
            message: 'Запис видалено'
        }
    }
}
