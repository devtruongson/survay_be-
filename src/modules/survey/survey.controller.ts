import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post()
    createSurvey(@Body() body: any) {
        return this.surveyService.createSurvey(body);
    }

    @Get()
    getSurvey(@Query('id') id: string) {
        return this.surveyService.getSurvey(id);
    }
}
