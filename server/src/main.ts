import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as moment from 'moment-timezone';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    moment.tz.setDefault('UTC');
    app.useGlobalPipes(new ValidationPipe({
        transform: true
    }));
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.setGlobalPrefix('api');
    await app.listen(8000);
}

bootstrap();
