import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import globalPrefix from './configs/GlobalPrefix';
import swaggerConfig from './configs/Swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    app.useGlobalPipes(new ValidationPipe());
    globalPrefix(app);
    swaggerConfig(app);
    app.use(compression());
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
