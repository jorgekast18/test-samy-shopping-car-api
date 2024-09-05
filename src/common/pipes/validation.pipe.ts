import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

// A utility function to check if a value is a class
function isClass(value: any): boolean {
  return typeof value === 'function' && /^[A-Z]/.test(value.name);
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const messages = errors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .flat();
      throw new BadRequestException(messages.join(', '));
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    // Define which types need validation (excluding built-in types)
    const types = [String, Number, Boolean, Array, Object];
    return isClass(metatype) && !types.includes(metatype as any);
  }
}