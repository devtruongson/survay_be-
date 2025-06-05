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
        db.data.push(data);
        await db.write();

        return sendResponse({
            data: db.data,
            message: "OK",
            statusCode: HttpStatus.OK
        })
    }

    async getSurvey() {
        await db.read();
        return sendResponse({
            data: db.data,
            message: "OK",
            statusCode: HttpStatus.OK
        })
    }

}
