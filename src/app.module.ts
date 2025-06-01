import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SurveyModule } from './modules/survey/survey.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        SurveyModule,
    ],
    controllers: [],

})
export class AppModule { }
