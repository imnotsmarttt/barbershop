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
    UseGuards
} from '@nestjs/common';
import {ServicesService} from "../services/services.service";
import {CreateOrUpdateServicesDto} from "../interfaces/services.dto";
import {MulterPhotoInterceptor} from "../../config/multer.config";
import {JwtAccessGuard} from "../../auth/guards/jwt-access.guard";
import {RolesGuard} from "../../role/roles.guard";
import {Roles} from "../../role/role.decorator";
import {RoleEnum} from "../../role/roles.enum";

@UseGuards(RolesGuard, JwtAccessGuard)
@Controller('admin/services')
export class ServicesAdminController {
    constructor(
        private readonly servicesService: ServicesService
    ) {}

    @Roles(RoleEnum.admin)
    @Get()
    async findAll(@Query() query) {
        return await this.servicesService.findAll(query)
    }

    @Roles(RoleEnum.admin)
    @Post()
    @MulterPhotoInterceptor('./files/utils', 'photo')
    async create(@Body() body: CreateOrUpdateServicesDto, @UploadedFile() photo: Express.Multer.File | undefined) {
        return await this.servicesService.create(body, photo)
    }

    @Roles(RoleEnum.admin)
    @Put(':id')
    @MulterPhotoInterceptor('./files/utils', 'photo')
    async update(
        @Param('id') id: number,
        @Body() body: CreateOrUpdateServicesDto,
        @UploadedFile() photo: Express.Multer.File | undefined
    ) {
        return await this.servicesService.update(id, body, photo)
    }

    @Roles(RoleEnum.admin)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.servicesService.delete(id)
        return {
            message: 'Послугу видалено',
            statusCode: HttpStatus.OK
        }
    }

}
