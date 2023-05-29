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

    async findOne(@Param('id') id: number) {
        return await this.servicesService.findOne({id})
    }
}
