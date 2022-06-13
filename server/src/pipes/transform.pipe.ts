import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from 'src/exceptions/validation.exception'

@Injectable()
export class TransformPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)
    console.log({ obj, errors, value, metadata , count: typeof obj.count})

    // if (errors.length) {
    //   let messages = errors.map((err) => {
    //     return `${err.property} - ${Object.values(err.constraints).join(', ')}`
    //   })

    //     throw new ValidationException(messages)
    // }

    return value
  }
}
