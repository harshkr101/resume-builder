import env from 'dotenv';

env.config();

export const config = {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL
};
