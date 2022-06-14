import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Games Api')
    .setDescription('Plataforma para gestão dos jogos.')
    .setVersion('1.0')
    .addTag('status')
    .addTag('login')
    .addTag('signup')
    .addTag('isAdmin')
    .addTag('user')
    .addTag('profile')
    .addTag('genre')
    .addTag('game')
    .addTag('profile-games')
    .addTag('homepage')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
