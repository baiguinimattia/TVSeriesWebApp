import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  console.log(process.env.PORT);
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
