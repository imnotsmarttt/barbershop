import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import {EmployeeService} from "./employee.service";
import {FreeVisitsParamDto} from "./employee.dto";


@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) {}

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return await this.employeeService.findOne({id})
    }

    @Get(':id/visits/:date')
    async freeVisits(@Param() params: FreeVisitsParamDto ) {
        return await this.employeeService.getVisits(params.id, params.date)
    }
}
