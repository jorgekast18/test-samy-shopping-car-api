import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  constructor(private readonly i18n: I18nService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const acceptLanguage = req.headers['accept-language'] || 'en';
    req['locale'] = acceptLanguage.split(',')[0];
    next();
  }
}