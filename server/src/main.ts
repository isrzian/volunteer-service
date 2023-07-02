import { NestFactory, Reflector } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { CreateDtoPipe } from '@steroidsjs/nest/src/infrastructure/pipes/CreateDtoPipe';
import './envInit';
import { ValidationExceptionFilter } from '@steroidsjs/nest/src/infrastructure/filters/ValidationExceptionFilter';
import { UserExceptionFilter } from '@steroidsjs/nest/src/infrastructure/filters/UserExceptionFilter';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './AppModule';
import { JwtAuthGuard } from './auth/infrastructure/guards/JwtAuthGuard';
import { ISessionService } from './auth/domain/interfaces/ISessionService';
import { AuthService } from './auth/domain/services/AuthService';
import { SentryExceptionFilter } from './SentryExceptionFilter';
import { SchemaSerializer } from './SchemaSerializer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();

  // Versioning
  app.setGlobalPrefix('/api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger config
  if (process.env.SWAGGER_URL) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(configService.get('title') || 'Application')
      .setDescription('Документация REST API')
      .setVersion(configService.get('version') || '1.0')
      .addBearerAuth()
      .build();

    const swaggerOptions: SwaggerDocumentOptions = {
      ignoreGlobalPrefix: false,
    };

    const document = SwaggerModule.createDocument(
      app,
      swaggerConfig,
      swaggerOptions,
    );

    // turn on basic auth to access swagger
    if (process.env.SWAGGER_PASSWORD) {
      app.use(
        [process.env.SWAGGER_URL],
        basicAuth({
          challenge: true,
          users: {
            [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
          },
        }),
      );
    }

    SwaggerModule.setup(process.env.SWAGGER_URL, app, document);
  }

  // Cors
  const origin = [];
  (configService.get('cors.allowDomains') || []).forEach((domain) => {
    if (domain.indexOf('://') !== -1) {
      origin.push(domain);
    } else {
      origin.push('https://' + domain);
      origin.push('http://' + domain);
    }
  });
  app.enableCors({
    credentials: true,
    origin,
    methods: configService.get('cors.allowMethods') || [
      'POST',
      'PUT',
      'GET',
      'OPTIONS',
      'DELETE',
    ],
    allowedHeaders: configService.get('cors.allowHeaders') || [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-CSRF-Token',

      // For file PUT upload
      'If-None-Match',
      'If-Modified-Since',
      'Cache-Control',
      'X-Requested-With',
      'Content-Disposition',
      'Content-Range',
    ],
  });

  // Validation
  app.useGlobalPipes(new CreateDtoPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalFilters(new UserExceptionFilter());

  if (process.env.APP_SENTRY_DSN) {
    app.useGlobalFilters(new SentryExceptionFilter());
  }

  app.useGlobalInterceptors(new SchemaSerializer(app.get(Reflector)));

  // Guards
  app.useGlobalGuards(
    new JwtAuthGuard(app.get(ISessionService), app.get(AuthService)),
  );

  // Start application
  const port = configService.get('port');
  await app.listen(
    port,
    () => console.log(`Server started http://localhost:${port}`), // eslint-disable-line no-console
  );
}

bootstrap();
