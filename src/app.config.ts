import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export function openApi(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('MS Integrações')
    .setDescription('MicroServiço de Integração TI')
    .setVersion('2.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
}

export function expressCustom(app: INestApplication): void {
  app.enableCors({ allowedHeaders: "*", origin: "*" });
  app.setGlobalPrefix('api/v1');
}