import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import * as path from 'path';
import { IUser } from 'src/types/interface';

type Data = IUser[];

const file = path.join(process.cwd(), 'src', 'utils', 'data.json');

const adapter = new JSONFile<Data>(file);
export const db = new Low<Data>(adapter, []);

export async function initDB() {
    await db.read();
    db.data ||= [];
    await db.write();
}
