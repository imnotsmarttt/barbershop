import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {BranchService} from "./branch.service";
import {CreateOrUpdateBranchDto} from "./branchDto";
import {RolesGuard} from "../role/roles.guard";
import {JwtGuard} from "../auth/guards/jwt.guard";
import {Roles} from "../role/role.decorator";
import {RoleEnum} from "../role/roles.enum";

@UseGuards(RolesGuard, JwtGuard)
@Controller('admin/branch')
export class BranchAdminController {
    constructor(
        private readonly branchService: BranchService
    ) {}

    @Roles(RoleEnum.admin)
    @Post()
    async create(@Body() body: CreateOrUpdateBranchDto) {
        return await this.branchService.create(body)
    }

    @Roles(RoleEnum.admin)
    @Put(':id')
    async update(@Param('id') id: number, @Body() body: CreateOrUpdateBranchDto) {
        return await this.branchService.update(id, body)
    }

    @Roles(RoleEnum.admin)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.branchService.deleteOne(id)
        return {message: 'Delete success', statusCode: HttpStatus.OK}
    }
}
