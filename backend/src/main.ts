import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';
import * as config from 'config';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { WinstonLogger } from './common/services/logger.service';
import { DataInterceptor } from './common/interceptors/data.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new WinstonLogger('Main') });

  const options = new DocumentBuilder()
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .setTitle('TID API ')
    .setHost(`${config.API.host}:${config.API.port}`)
    .setBasePath(config.API.prefix)
    .setSchemes(config.API.protocol)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  app.useGlobalGuards(new AuthGuard(new Reflector()));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new DataInterceptor());
  app.setGlobalPrefix(config.API.prefix);
  await app.listen(config.API.port);
}
bootstrap();
