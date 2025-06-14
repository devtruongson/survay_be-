import * as path from 'path';
import { IUser } from 'src/types/interface';

type Data = IUser[];

const fileData = path.join(process.cwd(), 'src', 'utils', 'data.json');
const fileDataBg = path.join(process.cwd(), 'src', 'utils', 'bg.json');

let db: any;
let dbBackground: any;

export async function initDB() {
    const { Low } = await import('lowdb');
    const { JSONFile } = await import('lowdb/node');

    const adapter = new JSONFile<Data>(fileData);
    const adapterBg = new JSONFile<Data>(fileDataBg);
    db = new Low<Data>(adapter, []);
    await db.read();
    db.data ||= [];
    await db.write();
    dbBackground = new Low<Data>(adapterBg, []);
    await dbBackground.read();
    dbBackground.data ||= [];
    await dbBackground.write();
}


export { db, dbBackground };
