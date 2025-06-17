import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
    private uploadDir = path.join(process.cwd(), 'uploads');

    async saveFile(file: Express.Multer.File): Promise<string> {
        await fs.mkdir(this.uploadDir, { recursive: true });
        const filePath = path.join(this.uploadDir, `${Date.now()}-${file.originalname}`);
        await fs.writeFile(filePath, file.buffer);
        return filePath;
    }
}
