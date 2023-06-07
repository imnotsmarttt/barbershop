import {Body, Controller, Delete, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RankService} from "./rank.service";
import {CreateOrUpdateRankDto} from "./rank.dto";
import {RolesGuard} from "../role/roles.guard";
import {JwtAccessGuard} from "../auth/guards/jwt-access.guard";
import {Roles} from "../role/role.decorator";
import {RoleEnum} from "../role/roles.enum";

@UseGuards(RolesGuard, JwtAccessGuard)
@Controller('admin/rank')
export class RankAdminController {
    constructor(
        private readonly rankService: RankService
    ) {}

    @Roles(RoleEnum.admin)
    @Post()
    async create(@Body() body: CreateOrUpdateRankDto) {
        return await this.rankService.create(body)
    }

    @Roles(RoleEnum.admin)
    @Put(':id')
    async update(@Param('id') id: number, @Body() body: CreateOrUpdateRankDto) {
        return await this.rankService.update(id, body)
    }

    @Roles(RoleEnum.admin)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.rankService.delete(id)
    }
}
