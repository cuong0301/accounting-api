import * as dotenv from 'dotenv';

import { isDevOrTestEnv, isEnvCorrect } from '../helper';
import { ENV, initializeValue } from './ormconfig';

if (!isEnvCorrect(ENV)) {
  throw new Error(`Invalid environment: ${ENV}`);
}

export const config = {
  PROJECT_NAME: process.env.PROJECT_NAME || 'accounting-api',
  LOG_LEVEL: initializeValue(process.env.LOG_LEVEL, 'fatal'),
  PORT: parseInt(initializeValue(process.env.PORT, '3030') as string, 10),
  ENV,
};
