import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');

  const appConfig = app.get(ConfigService);
  const port = appConfig.getOrThrow('app.port');

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost/v1:${port}`);
}

void bootstrap();
