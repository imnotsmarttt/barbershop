import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {BranchService} from "./branch.service";
import {CreateBranchDto, UpdateBranchDto} from "./branch.dto";

@Controller('branch')
export class BranchController {
    constructor(
        private readonly branchService: BranchService
    ) {}

    @Post()
    async create(@Body() body: CreateBranchDto) {
        return await this.branchService.create(body)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.branchService.deleteOne(id)
        return {message: 'Delete success', statusCode: HttpStatus.OK}
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        console.log(typeof id)
        return await this.branchService.getOne({id})
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UpdateBranchDto) {
        return await this.branchService.update(id, body)
    }
}
