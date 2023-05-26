import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {BranchService} from "./branch.service";
import {CreateOrUpdateBranchDto} from "./branchDto";

@Controller('branch')
export class BranchController {
    constructor(
        private readonly branchService: BranchService
    ) {}

    @Post()
    async create(@Body() body: CreateOrUpdateBranchDto) {
        return await this.branchService.create(body)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: CreateOrUpdateBranchDto) {
        return await this.branchService.update(id, body)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.branchService.deleteOne(id)
        return {message: 'Delete success', statusCode: HttpStatus.OK}
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return await this.branchService.findOne({id})
    }
}
