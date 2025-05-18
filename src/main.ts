import { CloudinaryConfig } from '@common/config/cloudinary.config';
import { AppModule } from '@modules/app';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  CloudinaryConfig.configureCloudinary();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    ['/api', '/api-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER || 'admin']:
          process.env.SWAGGER_PASSWORD || 'admin',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Jose Backend API')
    .setDescription(
      'Personal backend API for Jose, featuring school schedule management and more',
    )
    .setVersion('1.0')
    .addTag('schedule', 'School schedule management endpoints')
    .addTag('teachers', 'Teacher management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `Swagger documentation available at: http://localhost:${port}/api (protected with authentication)`,
  );
}
bootstrap();
