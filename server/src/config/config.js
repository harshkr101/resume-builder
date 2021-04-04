// config.js
import env from 'dotenv';
env.config();
export const config= {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  MAIL_HOST : process.env.MAIL_HOST,
  MAIL_PORT : process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_SENDER: process.env.MAIL_SENDER
};
