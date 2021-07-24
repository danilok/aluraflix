import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // https://docs.nestjs.com/techniques/logger#basic-customization
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  // https://docs.nestjs.com/techniques/configuration#using-in-the-maints
  const configService = app.get(ConfigService);
  // https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(new ValidationPipe());
  // https://docs.nestjs.com/techniques/configuration
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();
