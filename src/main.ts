import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import globalPrefix from './configs/GlobalPrefix';
import swaggerConfig from './configs/Swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    globalPrefix(app);
    swaggerConfig(app);
    app.use(compression());
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
