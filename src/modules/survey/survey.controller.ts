import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) { }

  @Post()
  createSurvey(@Body() body: any) {
    return this.surveyService.createSurvey(body);
  }

  @Get()
  getSurvey() {
    return this.surveyService.getSurvey();
  }
}
