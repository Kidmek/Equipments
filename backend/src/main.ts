import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createUploadsDirectory } from './common/utils/file.utils';

async function bootstrap() {
  createUploadsDirectory();

  const app = await NestFactory.create(AppModule);

  // Load environment variables
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my NestJS app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger is available at: http://localhost:${port}/api`);
}
void bootstrap();
