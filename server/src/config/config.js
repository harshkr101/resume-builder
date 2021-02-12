// config.js
import env from 'dotenv';
env.config();
export const config= {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL
};
