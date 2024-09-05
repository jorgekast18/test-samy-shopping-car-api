import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'i18n', async: true })
@Injectable()
export class I18nValidationAdapter implements ValidatorConstraintInterface {
  constructor(private readonly i18n: I18nService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const locale = args?.object?.['locale'] || 'es';
    const key = `validation.${args.property}`;
    return this.i18n.translate(key, { lang: locale });
  }
}