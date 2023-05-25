import {diskStorage} from "multer";
import * as path from "path";
import {UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";

export const multerOptions = (destination: string) => ({
    storage: diskStorage({
        destination,
        filename: (req, file, cb) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            return cb(null, `${randomName}${path.extname(file.originalname)}`);
        }
    })
})

export const MulterPhotoInterceptor  = (destination: string, fieldName: string) => UseInterceptors(FileInterceptor(fieldName, multerOptions(destination)))