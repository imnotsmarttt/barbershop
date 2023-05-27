import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {EmployeeService} from "./employee.service";
import {CreateOrUpdateEmployeeDto, FreeVisitsParamDto} from "./employee.dto";
import {MulterPhotoInterceptor} from "../config/multer.config";


@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) {}

    @Post()
    @MulterPhotoInterceptor('./files/employee/avatar', 'photo')
    async create(@Body() body: CreateOrUpdateEmployeeDto, @UploadedFile() photo: Express.Multer.File) {
        return await this.employeeService.create(body, photo)
    }

    @Put(':id')
    @MulterPhotoInterceptor('./files/employee/avatar', 'photo')
    async update(@Param('id') id: number, @Body() body: CreateOrUpdateEmployeeDto, @UploadedFile() photo: Express.Multer.File) {
        return await this.employeeService.update(id, body, photo)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.employeeService.delete(id)
        return {
            message: 'Працівника видалено',
            statusCode: HttpStatus.OK
        }
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return await this.employeeService.findOne({id})
    }

    @Get(':id/visits/:date')
    async freeVisits(@Param() params: FreeVisitsParamDto ) {
        return await this.employeeService.getVisits(params.id, params.date)
    }
}
