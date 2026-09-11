import dotenv from 'dotenv';
import {nanoid} from 'nanoid';
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/folder';
export const PORT = process.env.PORT || 5050;
export const generateShortId = (lenght) => {
    return nanoid(lenght);
}   
