import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDatabase } from 'src/types/config.types';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<unknown, true>) => {
        const db = configService.get<IDatabase>('database');
        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.db_name,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
