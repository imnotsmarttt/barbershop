import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import {EmployeeService} from "../services/employee.service";
import {FreeVisitsParamDto} from "../interfaces/employee.dto";
import {EmployeeHelperService} from "../services/employee.helper.service";


@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
        private readonly employeeHelperService: EmployeeHelperService,
    ) {}

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return await this.employeeService.findOne({id})
    }

    @Get(':id/visits/:date')
    async freeVisits(@Param() params: FreeVisitsParamDto ) {
        return await this.employeeHelperService.getVisits(params.id, params.date)
    }
}
