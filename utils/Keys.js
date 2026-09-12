import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tinyurl-clone';
export const PORT = process.env.PORT || 5050;

export const generateShortId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};