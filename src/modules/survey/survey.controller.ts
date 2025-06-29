import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post()
    createSurvey(@Body() body: any) {
        return this.surveyService.createSurvey(body);
    }

    @Post('save-file')
    saveSurvey(@Body() body: any) {
        return this.surveyService.saveSurveyToFile(body);
    }

    @Get('all-bg')
    getAllBackgrounds() {
        return this.surveyService.getAllBackgrounds();
    }

    @Get()
    getSurvey(@Query('id') id: string) {
        return this.surveyService.getSurvey(id);
    }

    @Post('update')
    updateSurvey(@Body() body: any) {
        return this.surveyService.updateSurveyTestProduct(body);
    }

    @Get('/session/surveys/:id/taking-session')
    getSlide(@Param('id') id: string) {
        return this.surveyService.getSurvey(id);
    }
}
