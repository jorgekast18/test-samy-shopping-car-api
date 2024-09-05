import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { I18nModule, QueryResolver, AcceptLanguageResolver, I18nService } from 'nestjs-i18n';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { APP_PIPE } from '@nestjs/core';
import { I18nValidationAdapter } from './common/validation/i18n-validation.adapter';
import { LocaleMiddleware } from './common/middleware/locale.middleware';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'), 
        watch: true,
      },
      resolvers: [
        {
          use: QueryResolver, options: ['lang']
        },
        AcceptLanguageResolver
      ]
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: (i18n: I18nService) => new ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors) => {
          const errorMessages = errors.map(err => {
            const property = err.property;
            const constraints = Object.values(err.constraints || {});
            return constraints.length ? constraints[0] : `Error: ${property}`;
          });
          return new Error(errorMessages.join(', '));
        }
      }),
      inject: [I18nService],
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocaleMiddleware)
      .forRoutes('*');
  }
}
