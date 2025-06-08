import { HttpStatus, Injectable } from '@nestjs/common';
import { sendResponse } from 'src/helpers/response';
import { db, initDB } from 'src/utils/db';

@Injectable()
export class SurveyService {
    async onModuleInit() {
        await initDB();
    }

    async createSurvey(data: any) {
        await db.read();

        const id = data.id;
        if (!id) {
            return sendResponse({
                data: null,
                message: 'ID is required',
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }
        const existingSurvey = db.data.find((s: any) => s.id === id);

        if (existingSurvey) {
            const newData = db.data.map((survey) => {
                if ((survey as any).id === id) {
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
                id: new Date().getTime(),
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

    async getSurvey(id: string) {
        await db.read();
        if (!id) {
            return sendResponse({
                data: db.data,
                message: 'OK',
                statusCode: HttpStatus.OK,
            });
        }
        const survey = db.data.find((s: any) => s.id == id);
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
}
