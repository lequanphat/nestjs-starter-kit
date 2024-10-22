import { AppConfig } from './app-config.type';
import { DatabaseConfig } from '../database/config/data-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
};
