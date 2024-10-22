import { AppConfig } from './app-config.type';
import { DatabaseConfig } from '../database/config/data-config.type';
import { MailConfig } from '../mail/config/mail-config.type';
import { AuthConfig } from '../auth/config/auth-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
  mail: MailConfig;
};
