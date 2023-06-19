import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
} from '@nestjs/common';
import {EmployeeService} from "../services/employee.service";
import {CreateOrUpdateEmployeeDto, FreeVisitsParamDto} from "../interfaces/employee.dto";
import {MulterPhotoInterceptor} from "../../config/multer.config";
import {JwtAccessGuard} from "../../auth/guards/jwt-access.guard";
import {RolesGuard} from "../../role/roles.guard";
import {Roles} from "../../role/role.decorator";
import {RoleEnum} from "../../role/roles.enum";


@Controller('admin/employee')
@UseGuards(RolesGuard, JwtAccessGuard)
export class EmployeeAdminController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) {}


    @Roles(RoleEnum.admin)
    @Get()
    async findAll(@Query() query) {
        return await this.employeeService.findAll(query)
    }

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
