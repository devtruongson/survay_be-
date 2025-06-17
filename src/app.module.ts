import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SurveyModule } from './modules/survey/survey.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        SurveyModule,
        UploadModule,
    ],
    controllers: [],

})
export class AppModule { }
