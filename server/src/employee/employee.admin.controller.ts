import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UploadedFile, UseGuards,} from '@nestjs/common';
import {EmployeeService} from "./employee.service";
import {CreateOrUpdateEmployeeDto, FreeVisitsParamDto} from "./employee.dto";
import {MulterPhotoInterceptor} from "../config/multer.config";
import {JwtGuard} from "../auth/guards/jwt.guard";
import {RolesGuard} from "../role/roles.guard";
import {Roles} from "../role/role.decorator";
import {RoleEnum} from "../role/roles.enum";


@Controller('admin/employee')
@UseGuards(RolesGuard, JwtGuard)
export class EmployeeAdminController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) {}

    @Roles(RoleEnum.admin)
    @Post()
    @MulterPhotoInterceptor('./files/employee/avatar', 'photo')
    async create(@Body() body: CreateOrUpdateEmployeeDto, @UploadedFile() photo: Express.Multer.File) {
        return await this.employeeService.create(body, photo)
    }

    @Roles(RoleEnum.admin)
    @Put(':id')
    @MulterPhotoInterceptor('./files/employee/avatar', 'photo')
    async update(@Param('id') id: number, @Body() body: CreateOrUpdateEmployeeDto, @UploadedFile() photo: Express.Multer.File) {
        return await this.employeeService.update(id, body, photo)
    }

    @Roles(RoleEnum.admin)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.employeeService.delete(id)
        return {
            message: 'Працівника видалено',
            statusCode: HttpStatus.OK
        }
    }
}
