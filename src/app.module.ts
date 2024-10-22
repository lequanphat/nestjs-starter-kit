import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import appConfig from './config/app.config';
import authConfig from './auth/config/auth.config';
import mailConfig from './mail/config/mail.config';
import databaseConfig from './database/config/database.config';
import { AuthModule } from './auth/auth.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { AllConfigType } from './config/config.type';
import { AppConfig } from './config/app-config.type';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, mailConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow<keyof AppConfig>(
          'app.fallbackLanguage',
          {
            infer: true,
          },
        ),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get<keyof AppConfig>('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MailModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
