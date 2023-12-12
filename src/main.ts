import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressCustom, openApi } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  openApi(app);
  expressCustom(app);
  await app.listen(3000);
}
bootstrap();
