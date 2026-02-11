import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { configValidationSchema } from './config/validation.schema';
import { TournamentsModule } from './tournaments/tournaments.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { CategoriesModule } from './categories/categories.module';
import { ArenasModule } from './arenas/arenas.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { CompetitionCategoriesModule } from './competition_categories/competition_categories.module';
import { TournamentsArenasModule } from './tournaments_arenas/tournaments_arenas.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true, // разрешаем переменные вне схемы
        abortEarly: false, // собираем все ошибки
      },
      cache: true,
    }),
    DbModule,
    TournamentsModule,
    CompetitionsModule,
    CategoriesModule,
    ArenasModule,
    DisciplinesModule,
    CompetitionCategoriesModule,
    TournamentsArenasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
