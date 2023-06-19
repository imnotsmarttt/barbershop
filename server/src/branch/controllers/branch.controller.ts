import {Controller, Get, Param} from '@nestjs/common';
import {BranchService} from "branch/services/branch.service";

@Controller('branch')
export class BranchController {
    constructor(
        private readonly branchService: BranchService
    ) {}

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return await this.branchService.findOne({id})
    }
}
