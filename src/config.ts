import * as dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  FILE_UPLOAD_PATH
} = process.env;
