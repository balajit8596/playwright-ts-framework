import * as dotenv from 'dotenv';

dotenv.config();

/** Central, typed access to environment configuration. */
export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
  standardUser: process.env.STANDARD_USER ?? 'standard_user',
  lockedUser: process.env.LOCKED_USER ?? 'locked_out_user',
  password: process.env.PASSWORD ?? 'secret_sauce',
};
