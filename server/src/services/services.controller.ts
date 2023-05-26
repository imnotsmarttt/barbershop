import {Body, Controller, Delete, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ServicesService} from "./services.service";
import {CreateOrUpdateServicesDto} from "./services.dto";
import {MulterPhotoInterceptor} from "../config/multer.config";

@Controller('services')
export class ServicesController {
    constructor(
        private readonly servicesService: ServicesService
    ) {
    }

    @Post()
    @MulterPhotoInterceptor('./files/services', 'photo')
    async creat(@Body() body: CreateOrUpdateServicesDto, @UploadedFile() photo: Express.Multer.File | undefined) {
        return await this.servicesService.create(body, photo)
    }

    @Put(':id')
    @MulterPhotoInterceptor('./files/services', 'photo')
    async update(
        @Param('id') id: number,
        @Body() body: CreateOrUpdateServicesDto,
        @UploadedFile() photo: Express.Multer.File | undefined
    ) {
        return await this.servicesService.update(id, body, photo)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.servicesService.delete(id)
        return {
            message: 'Послугу видалено',
            statusCode: HttpStatus.OK
        }
    }

    async findOne(@Param('id') id: number) {
        return await this.servicesService.findOne({id})
    }
}
