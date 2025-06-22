import { HttpStatus, Injectable } from '@nestjs/common';
import { sendResponse } from 'src/helpers/response';
import { db, dbBackground, initDB } from 'src/utils/db';
import * as path from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class SurveyService {
    async onModuleInit() {
        await initDB();
    }

    async getAllBackgrounds() {
        await dbBackground.read();
        return sendResponse({
            data: dbBackground.data,
            message: 'OK',
            statusCode: HttpStatus.OK,
        });
    }

    async updateSurveyTestProduct(data: any) {
        await db.read();
        const newData = {
            ...data,
            Id: new Date().getTime(),
        }
        
        db.data.push(newData);
        await db.write();

        return sendResponse({
            data: newData,
            message: 'OK',
            statusCode: HttpStatus.OK,
        });
    }
     

    async createSurvey(data: any) {
        await db.read();

        const Id = data.Id;
        if (!Id) {
            return sendResponse({
                data: null,
                message: 'ID is required',
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }
        const existingSurvey = db.data.find((s: any) => s.Id === Id);

        if (existingSurvey) {
            const newData = db.data.map((survey) => {
                if ((survey).Id === Id) {
                    return data;
                }
                return survey;
            });
            db.data = newData;
            await db.write();

            return sendResponse({
                data: data,
                message: 'OK',
                statusCode: HttpStatus.OK,
            });
        } else {
            const newData = {
                ...data,
                Id: new Date().getTime(),
            };
            db.data.push(newData);
            await db.write();

            return sendResponse({
                data: newData,
                message: 'OK',
                statusCode: HttpStatus.OK,
            });
        }
    }

    async getSurvey(Id: string) {
        await db.read();
        if (!Id) {
            return sendResponse({
                data: db.data,
                message: 'OK',
                statusCode: HttpStatus.OK,
            });
        }
        const survey = db.data.find((s: any) => s.Id == Id);
        if (!survey) {
            return sendResponse({
                data: null,
                message: 'Survey not found',
                statusCode: HttpStatus.NOT_FOUND,
            });
        }
        return sendResponse({
            data: survey,
            message: 'OK',
            statusCode: HttpStatus.OK,
        });
    }

    async saveSurveyToFile(data: any) {
        const filePath = path.join(process.cwd(), 'src', 'utils', 'savedSurveys.json');
        let surveys: any[] = [];
        try {
            const content = await fs.readFile(filePath, 'utf8');
            surveys = JSON.parse(content);
        } catch {
            surveys = [];
        }
        surveys.push(data);
        await fs.writeFile(filePath, JSON.stringify(surveys, null, 2));
        return sendResponse({
            data,
            message: 'OK',
            statusCode: HttpStatus.OK,
        });
    }
}
