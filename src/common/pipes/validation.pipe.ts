import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

function isClass(value: any): boolean {
  return typeof value === 'function' && /^[A-Z]/.test(value.name);
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(private readonly i18n: I18nService<Record<string, any>>) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const messages = await this.translateErrors(errors);
      throw new BadRequestException(messages.join(', '));
    }
    return value;
  }

  private async translateErrors(errors: ValidationError[]): Promise<string[]> {
    const translations = await Promise.all(
      errors.flatMap(async (error) => {
        return Promise.all(
          Object.keys(error.constraints || {}).map(async (constraintKey: string) => {
            const message = error.constraints[constraintKey];
            const property = error.property;

            try {
              // Usa la clave del mensaje de error y pasa la propiedad para la traducción
              return await this.i18n.translate(message, {
                args: { property },
              }) as string;
            } catch {
              // Si ocurre un error en la traducción, devuelve el mensaje original
              return message;
            }
          })
        );
      })
    );

    return translations.flat() as string[];
  }

  private toValidate(metatype: Function): boolean {
    const types = [String, Number, Boolean, Array, Object];
    return isClass(metatype) && !types.includes(metatype as any);
  }
}