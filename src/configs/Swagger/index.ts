import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
    .setTitle('API SHOPIFY DOCUMENT')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('shopify')
    .build();

export default function swaggerConfig(app: INestApplication) {
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
}
