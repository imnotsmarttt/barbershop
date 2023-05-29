import {Body, Controller, Delete, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {VisitsService} from "./visits.service";
import {CreateOrUpdateVisitDto} from "./visit.dto";
import {RolesGuard} from "../role/roles.guard";
import {JwtGuard} from "../auth/guards/jwt.guard";
import {Roles} from "../role/role.decorator";
import {RoleEnum} from "../role/roles.enum";

@UseGuards(RolesGuard, JwtGuard)
@Controller('admin/visits')
export class VisitsAdminController {
    constructor(private readonly visitsService: VisitsService) {}

    @Roles(RoleEnum.admin)
    @Post()
    async create(@Body() body: CreateOrUpdateVisitDto) {
        return await this.visitsService.create(body)
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
