import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { MESSAGE } from './messages';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	
	async transform(value: any, metadata : ArgumentMetadata) {
		const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
		Logger.log(JSON.stringify(errors))
    if (errors.length > 0) {
      throw new HttpException(MESSAGE.VALIDATION_FALID, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}