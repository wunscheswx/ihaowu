import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'

import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    const object = plainToClass(metatype, value || {})
    const errors = await validate(object, {
      skipMissingProperties: false,
      forbidUnknownValues: true
    })

    if (errors.length > 0) {
      throw new BadRequestException(errors[0].toString())
    }

    return object
  }
}
