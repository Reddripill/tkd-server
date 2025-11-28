import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { configValidationSchema } from './config/validation.schema';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, configuration],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true, // разрешаем переменные вне схемы
        abortEarly: false, // собираем все ошибки
      },
      cache: true,
    }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
