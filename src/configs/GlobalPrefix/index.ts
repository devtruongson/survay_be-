import { INestApplication } from '@nestjs/common';

export default function globalPrefix(app: INestApplication) {
    app.setGlobalPrefix(process.env.prefix ?? '/api');
    app.enableCors({
        origin: '*',
        credentials: true,
    });
}
