import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = app.get(ConfigService).get<number>('PORT');
  await app.listen(port ?? 3001);
}

bootstrap()
  .then(() => console.log('Server Started'))
  .catch((err) => console.log(err));
