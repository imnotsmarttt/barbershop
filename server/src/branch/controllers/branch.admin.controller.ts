import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {BranchService} from "../services/branch.service";
import {CreateOrUpdateBranchBodyDto} from "../interfaces/branch.dto";
import {RolesGuard} from "../../role/roles.guard";
import {JwtAccessGuard} from "../../auth/guards/jwt-access.guard";
import {Roles} from "../../role/role.decorator";
import {RoleEnum} from "../../role/roles.enum";

@UseGuards(RolesGuard, JwtAccessGuard)
@Controller('admin/branch')
export class BranchAdminController {
    constructor(
        private readonly branchService: BranchService
    ) {}

    @Roles(RoleEnum.admin)
    @Get()
    async findAll(@Query() query) {
        return await this.branchService.findAll(query)
    }

    @Roles(RoleEnum.admin)
    @Post()
    async create(@Body() body: CreateOrUpdateBranchBodyDto) {
        return await this.branchService.create(body)
    }

    @Roles(RoleEnum.admin)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: CreateOrUpdateBranchBodyDto) {
        return await this.branchService.update(parseInt(id), body)
    }

    @Roles(RoleEnum.admin)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.branchService.deleteOne(parseInt(id))
        return {message: 'Delete success', statusCode: HttpStatus.OK}
    }
}
